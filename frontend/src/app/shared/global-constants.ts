export class GlobalConstants {
  public static genericError: string =
    'কিছু একটি ভুল হয়েছে! আবারো চেষ্টা করুন';

  public static unauthorized: string =
    'আপনি এই পৃষ্ঠাটি দেখার জন্য অনুমোদিত নন!';

  public static productExistError: string = 'আইটেমটি ইতিমধ্যে বিদ্যমান';

  public static productAdded: string = 'আইটেমটি সফলভাবে যোগ করা হয়েছে';
  
  public static nameRegex: string = '^[A-Z\p{Bengali}][a-zA-Z\p{Bengali}]*$';

  public static regnoRegex: string = '^20[0-9]{8}$';

  public static emailRegex: string = '^[A-Za-z][A-Za-z0-9._%+-]+@(?:gmail\\.com|sust\\.edu|(?:[A-Za-z0-9-]+\\.)+(?:com|edu|gov|org|net|int|mil|co|biz|aero|arpa|asia|coop|info|museum|name|pro|tel|travel))$';

  public static contactNumberRegex: string = '^(?:\\+?88)?01[3-9]\\d{8}$';

  public static error: string = 'ভুল হয়েছে';
}

