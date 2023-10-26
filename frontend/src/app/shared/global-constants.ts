export class GlobalConstants {
  public static genericError: string =
    'কিছু একটি ভুল হয়েছে! আবারো চেষ্টা করুন';

  public static unauthorized: string =
    'আপনি এই পৃষ্ঠাটি দেখার জন্য অনুমোদিত নন!';

  public static productExistError: string = 'আইটেমটি ইতিমধ্যে বিদ্যমান';

  public static productAdded: string = 'আইটেমটি সফলভাবে যোগ করা হয়েছে';
  

  public static nameRegex: string = '[a-zA-Z0-9 ]*';

  public static emailRegex: string =
    '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

  public static contactNumberRegex: string = '^[e0-9]{10,10}$';

  public static error: string = 'ভুল হয়েছে';
}
