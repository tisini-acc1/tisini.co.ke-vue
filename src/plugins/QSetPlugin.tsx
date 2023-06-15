import QsetStatus from '@/utils/QsetStatus';
import  {VueElement, VueElementConstructor} from 'vue'

class QuizSetPlugin {
    static install(vue: VueElementConstructor, options?: any) {
      vue.prototype.$quizSet = QsetStatus.getInstance();
    }
  }

export default QuizSetPlugin;