export interface SReport {
  success: false;
  error?: string;
  data: {
    messages: {
      role: string;
      content: string;
    }[];
    type: string;
    imageUrl: string;
  };
}
export type AnalysisResultType = {
  healthRating: number;
  positiveAspects: {
    aspect: string;
    reason: string;
  }[];
  negativeAspects: {
    aspect: string;
    reason: string;
  }[];
  dailyConsumptionGuide: {
    recommendedServings: number;
    reason: string;
  };
  potentialHealthRisks: {
    ingredient: string;
    riskLevel: string;
    reason: string;
  }[];
  recommendations: {
    consumptionFrequency: string;
    reason: string;
  };
  nutritionalInsights: {
    ingredient: string;
    benefit: string;
  }[];
  alternativeSuggestions: {
    suggestion: string;
    reason: string;
  }[];
};

export interface Report {
  hidden?: boolean;
  _id: string;
  userId: string;
  messages?: {
    role: string;
    content: string;
  };
  historyTitle: string;
  creditsUsed: number;
  choice: "food" | "cosmetic";
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  imageName?: string;
}
export type FoodReport = {
  type: string;
  imageUrl: string;
  title: string;
  ingredients: {
    name: string;
    category: "Healthy" | "Neutral" | "Unhealthy";
    reason: string;
    percentage: string;
  }[];
  description: string;
  health_score: number;
  positive_aspects: string[];
  negative_aspects: string[];
  daily_consumption_guide: string;
  allergens_health_risks: string[];
  healthier_alternatives: string[];
  eco_friendliness: {
    vegan: "true" | "false";
    Cruelty_Free: "true" | "false";
    Biodegradable: "true" | "false";
  };
  usageInstructions: {
    whenToUse: string;
    howMuchToUse: string;
    howToUse: string;
  };
  healthyIngredientCount: number;
  neutralIngredientCount: number;
  unhealthyIngredientCount: number;
};

export type CosmeticReport = {
  type: string;
  imageUrl: string;
  title: string;
  ingredients: {
    name: string;
    category: "Healthy" | "Neutral" | "Unhealthy";
    reason: string;
    percentage: string;
  }[];
  care_rating: number;
  long_term_effects: {
    name: string;
    category: string;
    notes: string;
  }[];
  eco_friendliness: {
    vegan: "true" | "false";
    Cruelty_Free: "true" | "false";
    Biodegradable: "true" | "false";
  };
  allergenic_warning: string;
  recommended_alternatives: {
    name: string;
    replacement_for: string;
    benefit: string;
  }[];
  positive_aspects: string[];
  negative_aspects: string[];
  usageInstructions: {
    whenToUse: string;
    howMuchToUse: string;
    howToUse: string;
  };
  description: string;
};
