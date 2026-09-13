import type { Trait } from "./types";
import { TRAIT_LABELS } from "./scoring";

export interface TraitInfo {
  trait: Trait;
  /** English label for chrome */
  labelEn: string;
  /** Myanmar display name */
  nameMm: string;
  /** Myanmar short description */
  bodyMm: string;
}

export const TRAITS_INTRO_MM =
  "ဤစမ်းသပ်မှုသည် Dark Triad ဟုခေါ်သော စရိုက်သုံးမျိုးကို ပျော်ရွှင်စရာအနေဖြင့် တိုင်းတာကြည့်ခြင်းသာဖြစ်သည်။ ရောဂါရှာဖွေခြင်း သို့မဟုတ် ဆေးပညာအကဲဖြတ်ချက် မဟုတ်ပါ။";

export const TRAITS_INFO: TraitInfo[] = [
  {
    trait: "machiavellianism",
    labelEn: TRAIT_LABELS.machiavellianism,
    nameMm: "မက်ခီယာဗယ်လီယန်နစ်ဇင် (Machiavellianism)",
    bodyMm:
      "စီမံကိန်းကျကျ လူမှုဆက်ဆံရေးကို သုံးတတ်ခြင်းဖြစ်သည်။ ကိုယ်လိုချင်သော ရလဒ်ရရန် သြဇာ၊ နည်းဗျူဟာနှင့် လူအချင်းချင်း အကျိုးစီးပွားကို တွက်ချက်၍ လှုပ်ရှားတတ်သည်။",
  },
  {
    trait: "narcissism",
    labelEn: TRAIT_LABELS.narcissism,
    nameMm: "နာဆစ်စစ်ဇင် (Narcissism)",
    bodyMm:
      "မိမိကိုယ်ကို အလွန်အမင်း မြှောက်ပင့်ခြင်း၊ ချီးမွမ်းခံချင်မှုနှင့် မိမိသည် ထူးခြားသူဖြစ်သည်ဟု ခံယူခြင်းတို့ ပါဝင်သည်။ အာရုံစိုက်မှုနှင့် အသိအမှတ်ပြုမှုကို ရှာတတ်သည်။",
  },
  {
    trait: "psychopathy",
    labelEn: TRAIT_LABELS.psychopathy,
    nameMm: "ဆိုက်ကိုပသီ (Psychopathy)",
    bodyMm:
      "စာနာမှုနည်းခြင်း၊ ရဲတင်းမှု သို့မဟုတ် စိတ်လျင်မြန်ခြင်း၊ ဖိအားအောက်တွင် စိတ်ခံစားချက် အေးစက်နေတတ်ခြင်းတို့ ပါဝင်သည်။ အကျိုးဆက်ကို နည်းနည်းသာ ထည့်တွက်တတ်သည်။",
  },
];
