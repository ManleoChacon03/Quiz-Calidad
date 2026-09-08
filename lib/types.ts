export type Student = {
  name: string;
  carnet: string;
};

export type Answer = {
  questionId: number;
  selectedIndex: number | null;
};

export type Stage = "login" | "quiz" | "results";
