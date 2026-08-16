import { CriteriaType } from '@prisma/client';

export interface SmartCriteria {
  id: string;
  weight: number;
  type: CriteriaType;
}

export interface SmartAlternativeValue {
  alternativeId: string;
  values: Record<string, number>; // Record<criteriaId, value>
}

export interface SmartResult {
  alternativeId: string;
  score: number;
  rank: number;
}

export class SmartCalculator {
  /**
   * 1. Normalisasi Bobot Kriteria
   * @param criteria List of criteria
   * @returns Record<criteriaId, normalizedWeight>
   */
  public normalizeWeights(criteria: SmartCriteria[]): Record<string, number> {
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    const normalized: Record<string, number> = {};

    for (const c of criteria) {
      // Menghindari pembagian dengan nol
      normalized[c.id] = totalWeight > 0 ? c.weight / totalWeight : 0;
    }

    return normalized;
  }

  /**
   * 2. & 3. Menghitung Nilai Utility dan Weighted Score
   * @param criteria List of criteria
   * @param alternatives List of alternatives with their values for each criteria
   * @param normalizedWeights The normalized weights for each criteria
   * @returns Array of alternatives with their final score
   */
  public calculateScores(
    criteria: SmartCriteria[],
    alternatives: SmartAlternativeValue[],
    normalizedWeights: Record<string, number>
  ): SmartResult[] {
    const results: SmartResult[] = [];

    // Tentukan C_max dan C_min untuk setiap kriteria berdasarkan nilai pada semua alternatif
    const minMax: Record<string, { min: number; max: number }> = {};
    for (const c of criteria) {
      const values = alternatives.map(a => a.values[c.id] || 0);
      minMax[c.id] = {
        min: Math.min(...values),
        max: Math.max(...values),
      };
    }

    // Hitung Utility dan Final Score untuk setiap alternatif
    for (const alt of alternatives) {
      let finalScore = 0;

      for (const c of criteria) {
        const val = alt.values[c.id] || 0;
        const { min, max } = minMax[c.id];
        let utility = 0;

        // Jika min == max, berarti semua alternatif memiliki nilai sama, utility = 1
        if (min === max) {
          utility = 1;
        } else {
          if (c.type === CriteriaType.BENEFIT) {
            utility = (val - min) / (max - min);
          } else if (c.type === CriteriaType.COST) {
            utility = (max - val) / (max - min);
          }
        }

        // Tambahkan (Utility * Bobot Normalisasi) ke skor akhir
        finalScore += utility * (normalizedWeights[c.id] || 0);
      }

      results.push({
        alternativeId: alt.alternativeId,
        score: finalScore,
        rank: 0, // Akan diisi di tahap sorting
      });
    }

    return this.rankResults(results);
  }

  /**
   * 4. Perankingan
   * @param results Unsorted results
   * @returns Sorted results with rank assigned
   */
  private rankResults(results: SmartResult[]): SmartResult[] {
    // Sort descending by score
    const sorted = [...results].sort((a, b) => b.score - a.score);
    
    // Assign rank
    return sorted.map((res, index) => ({
      ...res,
      rank: index + 1,
    }));
  }

  /**
   * Orchestrator function to run the full SMART calculation
   */
  public calculate(
    criteria: SmartCriteria[],
    alternatives: SmartAlternativeValue[]
  ): SmartResult[] {
    if (!criteria.length || !alternatives.length) return [];
    
    const normalizedWeights = this.normalizeWeights(criteria);
    return this.calculateScores(criteria, alternatives, normalizedWeights);
  }
}
