export interface SignupUserInterface {
  nickname: string; // Nickname with a max length of 255 and min length of 1
  email: string; // Email with a max length of 255 and min length of 1
  first_name: string | null; // Optional first name with a max length of 255
  last_name: string | null; // Optional last name with a max length of 255
  password: string; // Password with a max length of 68 and min length of 6
  phone_number: string | null; // Optional phone number with a max length of 15
  is_quiz_admin: boolean; // Is quiz admin flag
  is_author: boolean; // Is author flag
}

export interface SignInUserInterface {
  phone_number: string;// Phone number with a max length of 10 and min length of 10
  password: string; // Password with a max length of 68 and min length of 6
}

export interface LoginTokenInterface {
  access: string;
  refresh: string;
}

export interface LoginUserResponseInterface extends UserInterface {
  tokens: string; // Tokens
}

export interface RegisterUserResponseInterface
  extends Pick<
    SignupUserInterface,
    "nickname" | "email" | "first_name" | "last_name"
  > {
  id: number; // ID
  is_quiz_admin: boolean; // Is quiz admin flag
  is_author: boolean; // Is author flag
}
export interface ArticleInterface {
  id: number; // ID
  article_title: string; // Article title with a max length of 800 and min length of 1
  slug: string; // Slug with pattern ^[-a-zA-Z0-9_]+$ and a max length of 50 and min length of 1
  article_category: ArticleCategoryInterface; // ArticleCategory object
  featured_image?: string | null; // Optional Featured image
  excerpt?: string; // Optional Excerpt
  article_body?: string | null; // Optional Article body
  is_featured: boolean; // Is featured flag
  is_sponsored: boolean; // Is sponsored flag
  is_editors_pick: boolean; // Is editors pick flag
  publish: string; // Publish date-time
  author: ArticleAuthorInterface; // ArticleAuthor object
  tags: string[]; // Array of tags with min length of 1
}

export interface ArticleCategoryInterface {
  id: number; // ID
  article_category?: string | null; // Optional Article category with a max length of 300
}

export interface ArticleAuthorInterface {
  id: number; // ID
  first_name: string; // First name
  last_name: string; // Last name
  author_email: string; // Author email
  author_description?: string | null; // Optional Author description
  linkedin_url?: string | null; // Optional Linkedin url with a max length of 300
  facebook_url?: string | null; // Optional Facebook url with a max length of 300
  twitter_url?: string | null; // Optional Twitter url with a max length of 300
}

export interface AnswerInterface {
  is_correct: any;
  uid: string; //UID
  answer: string; // Answer with a max length of 1000 and min length of 1
  is_answer: boolean; // Is answer flag
}

export interface QuestionInterface {
  uid: string; // ID
  question: string; // Question with a max length of 1000 and min length of 1
  image?: string | null; // Optional Image
  points: number; // Points
  timer: number; // Timer
  answers: AnswerInterface[]; // Array of Answer objects
  is_answered?: boolean; // Is answered flag
  selected_answer?: AnswerInterface; // Optional Selected answer
  duration?: number; // Duration
}

export interface QuestionSetInterface {
  uid: string; // UID
  category_name: string; // Category name with a max length of 300 and min length of 1
  play_date: string; // Play date-time
  start_time: string; // Start time
  end_time: string; // End time
  status: "PL" | "NP"; // PL - Played, NP - Not Played
  is_payable: "PA" | "NP"; // PA - Payable, NP - Not Payable
  amount_payable: number; // Amount payable
  prize_won: string; // Prize won
  questions: QuestionInterface[]; // Array of Question objects
}

export interface OrganizationInterface {
  uid: string; // UID
  organization_name: string; // Organization name with a max length of 300 and min length of 1
  org_logo?: string | null; // Optional Organization logo
  question_sets: QuestionSetInterface[]; // Array of QuestionSet objects
}

export interface QuestionPlayersInterface {
  id: number; // ID
  question_set: QuestionSetInterface; // QuestionSet object
  timer: number; // Timer
}
export type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "CONNECT"
  | "TRACE";

export interface RequestInterface<D extends any, E extends any | null> {
  url: string;
  method: HTTPMethod;
  data?: any;
  config?: Record<string, any>;
  callback?: (data: D, err: E) => void;
}
export interface RequestFunction<T, E> {
  (cb?: (data: T, err: E) => void): Promise<T | E | void>;
}

export interface QuizStoreInterface {
  questionPlayers: QuestionPlayersInterface[];
  currentQuestionPlayer: QuestionPlayersInterface | null;
  currentQuestion: QuestionInterface | null;
  currentQuestionIndex: number;
  currentQuestionSet: QuestionSetInterface | null;
  currentOrganization: OrganizationInterface | null;
  organizations: OrganizationInterface[];
  counter: number;
  timer: number;
  isPlaying: boolean;
  questions: QuestionInterface[];
  scoreSummary: QuizScoreSummaryInterface | null;
  currentAnswers: AnswerInterface[];
}

export interface QuizScoreSummaryInterface {
  questionSetUid: string;
  organizationUid: string;
  score: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalSkippedAnswers: number;
  totalPoints: number;
  totalDuration: number;
  avgDuration: number;
}

export interface QuizPlayeInterface {
  questions: QuestionInterface[];
  questionSetUid: string;
  organizationUid: string;
}
export interface UserInterface {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_quiz_admin?: boolean;
}
export interface AuthStateInterface {
  loading: boolean;
  user: UserInterface | null;
  authenticated: boolean;
  refreshToken: string | null;
  accessToken: string | null;
}
export interface UserStateRoleInterface {
  [key: string]: any;
}
export interface TisiniRouteMetaInterface {
  title?: string;
  requiresAuth: boolean;
  roles?: UserStateRoleInterface[];
}

export interface SubmitQuizPayload {
  question_players: {
    points: number;
    timer: number;
  };
}

export interface QuizSetLeaderBoardSummaryPayload {
  uid: string;
  category_name: string;
  question_players: QsetPlayer[];
}

interface QsetPlayer {
  id: number;
  q_player: QPlayer;
  points: number;
  timer: number;
  score?: number;
}


interface QPlayer {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic?: string | null;
}
