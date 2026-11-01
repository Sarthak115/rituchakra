# Translations QA

Status of the Hindi (HI) and Odia (OR) text in the learner journey. **None of it has had a native review yet.** Reviewer: Sarthak Kumar. Mark each row `Reviewed` once checked, or put a correction in Notes and it will be applied.

Statuses:

- `Machine draft`: written by the AI assistant, not checked by a native speaker.
- `Existing`: present before the demo upgrade; origin and review status unknown.
- `Reviewed`: checked by a fluent or native reviewer.
- `Tested`: reviewed, and checked on screen.

## Coverage matrix (demo path)

| Story | EN | HI | OR | What is new |
|---|---|---|---|---|
| Dadi Ki Rasoi (Aara) | Final | Existing + machine draft | Existing + machine draft | find-out, lets-check, fact-explain, dadi-payoff, Science Check, reflection |
| Dadi Ki Rasoi (Aarav, Aara's brother) | Final | Machine draft | Machine draft | Opening and resolution lines |
| The Stain | Final | Existing + machine draft | Existing + machine draft | Consequences, Science Check, reflection |
| Choose What Fits | Final | Existing + machine draft | Existing + machine draft | Consequences, Science Check, two product lines, reflection |
| The Joke | Final | Existing + machine draft | Existing + machine draft | Consequences, Science Check, reflection |
| The Long Journey (Nagar) | Final | Machine draft | Machine draft | Whole story is new |
| UI: controls, cards, end screen | Final | Existing + machine draft | Existing + machine draft | Consequence card, reflection screen, culture note, source label |

Automated check: `tests/translations.test.ts` fails if any learner-facing story string lacks HI or OR, for both the Aara and Aarav versions.

## Strings needing native review

They live in `data/translations/demoUpgrade.ts`, plus one shortened line in `communityStories.ts`. Each AI-written line was checked by translating it back to English. That does not replace a native review.

### Story controls

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| What happened next | आगे क्या हुआ | ତା’ପରେ କ’ଣ ହେଲା | Machine draft | |
| You chose | आपने चुना | ଆପଣ ବାଛିଲେ | Machine draft | |
| See what happens | देखें आगे क्या होता है | ଦେଖନ୍ତୁ କ’ଣ ହୁଏ | Machine draft | |
| Culture & tradition | संस्कृति और परंपरा | ସଂସ୍କୃତି ଓ ପରମ୍ପରା | Machine draft | |
| Source | स्रोत | ଉତ୍ସ | Machine draft | |
| Think about it | सोचकर देखें | ଭାବି ଦେଖନ୍ତୁ | Machine draft | |
| Think quietly, or talk about it with someone next to you. There is no wrong answer. | मन में सोचें, या पास बैठे किसी साथी से इस पर बात करें। कोई जवाब गलत नहीं है। | ମନେ ମନେ ଭାବନ୍ତୁ, କିମ୍ବା ପାଖରେ ଥିବା କାହା ସହ ଏ ବିଷୟରେ କଥା ହୁଅନ୍ତୁ। କୌଣସି ଉତ୍ତର ଭୁଲ ନୁହେଁ। | Machine draft | |
| Try another choice | कोई दूसरा जवाब चुनें | ଅନ୍ୟ ଏକ ଉତ୍ତର ବାଛନ୍ତୁ | Machine draft | |

### Character expressions (screen-reader labels)

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| neutral | शांत | ଶାନ୍ତ | Machine draft | |
| curious | जिज्ञासु | ଜିଜ୍ଞାସୁ | Machine draft | |
| worried | चिंतित | ଚିନ୍ତିତ | Machine draft | |
| embarrassed | संकोच में | ସଂକୋଚରେ | Machine draft | |
| reassuring | भरोसा दिलाते हुए | ଭରସା ଦେଉଛନ୍ତି | Machine draft | |

### Consequences – The Stain

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Asking someone you trust means you do not have to handle it alone. | जिस पर भरोसा हो उससे मदद माँगने पर आपको अकेले सब नहीं संभालना पड़ता। | ଯାହା ଉପରେ ଭରସା ଅଛି ତାଙ୍କୁ ସାହାଯ୍ୟ ମାଗିଲେ, ଆପଣଙ୍କୁ ଏକା ସବୁ ସମ୍ଭାଳିବାକୁ ପଡ଼େ ନାହିଁ। | Machine draft | |
| Wanting privacy is understandable. Asking for help can still make things easier. | अकेले में संभालना चाहना समझ में आता है। फिर भी मदद माँगने से काम आसान हो सकता है। | ଏକାନ୍ତରେ ସମ୍ଭାଳିବାକୁ ଚାହିଁବା ସ୍ୱାଭାବିକ। ତଥାପି ସାହାଯ୍ୟ ମାଗିଲେ କାମ ସହଜ ହୋଇପାରେ। | Machine draft | |
| Teachers can help with supplies and a private place to change. | शिक्षक पैड जैसी ज़रूरी चीज़ें और कपड़े बदलने की निजी जगह दिलाने में मदद कर सकते हैं। | ଶିକ୍ଷକମାନେ ପ୍ୟାଡ୍ ଭଳି ଦରକାରୀ ଜିନିଷ ଓ ପୋଷାକ ବଦଳାଇବା ପାଇଁ ଏକ ଘରୋଇ ସ୍ଥାନ ଦେବାରେ ସାହାଯ୍ୟ କରିପାରିବେ। | Machine draft | |
| Even a light joke can make an embarrassing moment feel worse. | हल्का-सा मज़ाक भी संकोच के पल को और मुश्किल बना सकता है। | ଛୋଟିଆ ଥଟ୍ଟା ବି ସଂକୋଚର ମୁହୂର୍ତ୍ତକୁ ଆହୁରି କଷ୍ଟକର କରିଦେଇପାରେ। | Machine draft | |
| Giving privacy is respectful, but quietly checking in can help more. | किसी को अकेला छोड़ना सम्मान है, पर चुपचाप हाल पूछ लेना और भी मदद कर सकता है। | କାହାକୁ ଏକାନ୍ତ ଦେବା ସମ୍ମାନ, କିନ୍ତୁ ଚୁପଚାପ୍ ପଚାରିବା ଆହୁରି ସାହାଯ୍ୟ କରିପାରେ। | Machine draft | |
| Offering help quietly lets your friend decide what she needs. | चुपचाप मदद की पेशकश करने से आपकी दोस्त खुद तय कर पाती है कि उसे क्या चाहिए। | ଚୁପଚାପ୍ ସାହାଯ୍ୟ କରିବାକୁ କହିଲେ, ଆପଣଙ୍କ ସାଙ୍ଗ ନିଜେ ସ୍ଥିର କରିପାରେ ତାକୁ କ’ଣ ଦରକାର। | Machine draft | |

### Consequences – The Joke

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Laughing along can keep a joke going, even when no harm is meant. | साथ में हँसने से मज़ाक चलता रहता है, भले ही किसी का इरादा बुरा न हो। | ସାଙ୍ଗରେ ହସିଲେ ଥଟ୍ଟା ଚାଲୁରହେ, ଯଦିଓ କାହାର ଖରାପ ଉଦ୍ଦେଶ୍ୟ ନଥାଏ। | Machine draft | |
| Staying quiet can feel safer, but the person being teased may feel alone. | चुप रहना आसान लग सकता है, पर जिसका मज़ाक बन रहा है वह अकेला महसूस कर सकता है। | ଚୁପ୍ ରହିବା ସହଜ ଲାଗିପାରେ, କିନ୍ତୁ ଯାହାକୁ ନେଇ ଥଟ୍ଟା ହେଉଛି ସେ ଏକା ଅନୁଭବ କରିପାରେ। | Machine draft | |
| Stepping in calmly can change the mood without embarrassing anyone. | शांति से बीच में बोलने से किसी को शर्मिंदा किए बिना माहौल बदल सकता है। | ଶାନ୍ତ ଭାବେ କିଛି କହିଲେ, କାହାକୁ ଲଜ୍ଜିତ ନକରି ପରିବେଶ ବଦଳିପାରେ। | Machine draft | |
| “Just ignore them” can feel dismissive. Listening first shows you care. | "बस अनदेखा करो" कहना बात को टालने जैसा लग सकता है। पहले सुनना दिखाता है कि आपको परवाह है। | "କେବଳ ଅଣଦେଖା କର" କହିବା କଥାକୁ ଏଡ଼ାଇଦେବା ଭଳି ଲାଗିପାରେ। ପ୍ରଥମେ ଶୁଣିଲେ ଜଣାପଡ଼େ ଆପଣ ଚିନ୍ତା କରନ୍ତି। | Machine draft | |
| Offering help and letting her decide respects her choices. | मदद की पेशकश करना और फ़ैसला उस पर छोड़ना उसकी पसंद का सम्मान है। | ସାହାଯ୍ୟ କରିବାକୁ କହିବା ଓ ନିଷ୍ପତ୍ତି ତା’ ଉପରେ ଛାଡ଼ିବା ତା’ ପସନ୍ଦକୁ ସମ୍ମାନ ଦେବା। | Machine draft | |
| Calling someone too sensitive can make them feel their feelings do not matter. | किसी को "ज़्यादा संवेदनशील" कहने से उसे लग सकता है कि उसकी भावनाओं की कोई कीमत नहीं। | କାହାକୁ "ବେଶୀ ସମ୍ବେଦନଶୀଳ" କହିଲେ ତାକୁ ଲାଗିପାରେ ତା’ ଭାବନାର କିଛି ମୂଲ୍ୟ ନାହିଁ। | Machine draft | |

### Consequences – Choose What Fits

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Friends’ experiences can help, but what suits them may not suit you. | दोस्तों के अनुभव काम आ सकते हैं, पर जो उन्हें ठीक लगे, ज़रूरी नहीं आपको भी ठीक लगे। | ସାଙ୍ଗମାନଙ୍କ ଅନୁଭୂତି କାମରେ ଆସିପାରେ, କିନ୍ତୁ ଯାହା ସେମାନଙ୍କୁ ଠିକ୍ ଲାଗେ ତାହା ଆପଣଙ୍କୁ ବି ଠିକ୍ ଲାଗିବ ବୋଲି ନୁହେଁ। | Machine draft | |
| Choosing what is comfortable and practical for you is an informed choice. | जो आपके लिए आरामदायक और सुविधाजनक हो, उसे चुनना समझदारी भरा फ़ैसला है। | ଯାହା ଆପଣଙ୍କ ପାଇଁ ଆରାମଦାୟକ ଓ ସୁବିଧାଜନକ, ତାହା ବାଛିବା ଏକ ବୁଝାମଣା ନିଷ୍ପତ୍ତି। | Machine draft | |
| People have different needs, so one product may not suit everyone. | हर किसी की ज़रूरतें अलग होती हैं, इसलिए एक ही उत्पाद सबके लिए सही नहीं होता। | ପ୍ରତ୍ୟେକଙ୍କ ଆବଶ୍ୟକତା ଅଲଗା, ତେଣୁ ଗୋଟିଏ ସାମଗ୍ରୀ ସମସ୍ତଙ୍କ ପାଇଁ ଠିକ୍ ନହୋଇପାରେ। | Machine draft | |

### Reflection questions

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Is there a belief in your family you would like to understand better? How could you ask about it respectfully? | क्या आपके परिवार में कोई ऐसी मान्यता है जिसे आप बेहतर समझना चाहेंगे? आप उसके बारे में आदर से कैसे पूछ सकते हैं? | ଆପଣଙ୍କ ପରିବାରରେ ଏମିତି କୌଣସି ବିଶ୍ୱାସ ଅଛି କି ଯାହାକୁ ଆପଣ ଭଲ ଭାବେ ବୁଝିବାକୁ ଚାହାଁନ୍ତି? ସେ ବିଷୟରେ ଆପଣ କେମିତି ସମ୍ମାନର ସହ ପଚାରିପାରିବେ? | Machine draft | |
| If you saw a classmate with a stain, what is one quiet, kind thing you could do? | अगर आप किसी सहपाठी के कपड़ों पर दाग देखें, तो आप चुपचाप कौन-सी एक अच्छी बात कर सकते हैं? | ଯଦି ଆପଣ କୌଣସି ସହପାଠୀଙ୍କ ପୋଷାକରେ ଦାଗ ଦେଖନ୍ତି, ତେବେ ଚୁପଚାପ୍ କେଉଁ ଗୋଟିଏ ଭଲ କାମ କରିପାରିବେ? | Machine draft | |
| What could you say next time a joke makes someone uncomfortable? | अगली बार जब किसी मज़ाक से कोई असहज हो, तो आप क्या कह सकते हैं? | ପରବର୍ତ୍ତୀ ଥର କୌଣସି ଥଟ୍ଟାରେ କେହି ଅସହଜ ହେଲେ, ଆପଣ କ’ଣ କହିପାରିବେ? | Machine draft | |
| What questions could help someone choose a product that fits their needs? | कौन-से सवाल किसी को अपनी ज़रूरत के हिसाब से उत्पाद चुनने में मदद कर सकते हैं? | କେଉଁ ପ୍ରଶ୍ନ କାହାକୁ ନିଜ ଆବଶ୍ୟକତା ଅନୁସାରେ ସାମଗ୍ରୀ ବାଛିବାରେ ସାହାଯ୍ୟ କରିପାରିବ? | Machine draft | |

### Dadi Ki Rasoi – both companions

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Then shall we find out together, Dadi? | तो क्या हम साथ मिलकर पता करें, Dadi? | ତେବେ ଆମେ ମିଶି ଜାଣିବା କି, Dadi? | Machine draft | |
| Yes, let’s find out. | हाँ, चलो पता करते हैं। | ହଁ, ଚାଲ ଜାଣିବା। | Machine draft | |
| Of course, Dadi. Let’s look at what science says, together. | ज़रूर, Dadi। चलिए साथ में देखते हैं कि विज्ञान क्या कहता है। | ନିଶ୍ଚୟ, Dadi। ଚାଲନ୍ତୁ ମିଶି ଦେଖିବା ବିଜ୍ଞାନ କ’ଣ କହେ। | Machine draft | |
| In our time, nobody explained this to us. You children should understand it. | हमारे ज़माने में हमें किसी ने समझाया नहीं था। तुम लोगों को समझना चाहिए। | ଆମ ସମୟରେ ଆମକୁ କେହି ବୁଝାଇନଥିଲେ। ତୁମମାନଙ୍କୁ ବୁଝିବା ଦରକାର। | Machine draft | |

### Dadi Ki Rasoi – Aarav as Aara's brother

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Aarav, dear, tell Aara not to come into the kitchen during her period. | Aarav बेटा, Aara से कहो कि माहवारी के समय वह रसोई में न आए। | Aarav ପିଲା, Aara କୁ କହ ଯେ ମାସିକ ଋତୁସ୍ରାବ ସମୟରେ ସେ ରୋଷେଇଘରକୁ ନ ଆସୁ। | Machine draft | |
| Dadi, why do you say that? | Dadi, आप ऐसा क्यों कहती हैं? | Dadi, ଆପଣ ଏମିତି କାହିଁକି କହୁଛନ୍ତି? | Machine draft | |
| Aara, dear, come in. Today the three of us will cook together. | Aara बेटा, आओ, अंदर आओ। आज हम तीनों साथ में खाना बनाएँगे। | Aara ପିଲା, ଆସ, ଭିତରକୁ ଆସ। ଆଜି ଆମେ ତିନିଜଣ ମିଶି ରୋଷେଇ କରିବା। | Machine draft | |
| Really, Dadi? Thank you for asking, Aarav. | सच, Dadi? Aarav, पूछने के लिए शुक्रिया। | ସତରେ, Dadi? Aarav, ପଚାରିଥିବାରୁ ଧନ୍ୟବାଦ। | Machine draft | |
| The right information is for everyone. Asking questions helps all of us learn. | सही जानकारी सबके लिए है। सवाल पूछने से हम सब सीखते हैं। | ଠିକ୍ ତଥ୍ୟ ସମସ୍ତଙ୍କ ପାଇଁ। ପ୍ରଶ୍ନ ପଚାରିଲେ ଆମେ ସମସ୍ତେ ଶିଖୁ। | Machine draft | |

### Science Checks (wording tied to sources in docs/health-evidence-register.md)

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| During a period, one should stay out of the kitchen. | माहवारी के दौरान रसोई से दूर रहना चाहिए। | ମାସିକ ଋତୁସ୍ରାବ ସମୟରେ ରୋଷେଇଘରଠାରୁ ଦୂରେ ରହିବା ଉଚିତ। | Machine draft | |
| Menstruation is a natural bodily process. Menstrual blood is regular blood and tissue, with no special or dangerous properties. Rules about not handling food during a period come from culture and tradition. | माहवारी शरीर की एक प्राकृतिक प्रक्रिया है। माहवारी का खून सामान्य खून और ऊतक होता है, इसमें कुछ भी खास या खतरनाक नहीं होता। माहवारी में खाना न छूने जैसे नियम संस्कृति और परंपरा से आते हैं। | ମାସିକ ଋତୁସ୍ରାବ ଶରୀରର ଏକ ପ୍ରାକୃତିକ ପ୍ରକ୍ରିୟା। ଋତୁସ୍ରାବର ରକ୍ତ ସାଧାରଣ ରକ୍ତ ଓ ଟିସୁ, ଏଥିରେ କିଛି ବିଶେଷ ବା ବିପଜ୍ଜନକ ଗୁଣ ନାହିଁ। ଋତୁସ୍ରାବ ସମୟରେ ଖାଦ୍ୟ ନଛୁଇଁବା ଭଳି ନିୟମ ସଂସ୍କୃତି ଓ ପରମ୍ପରାରୁ ଆସିଛି। | Machine draft | |
| Families and communities follow different traditions. You can respect a tradition and still know the medical fact. | अलग-अलग परिवार और समुदाय अलग-अलग परंपराएँ मानते हैं। आप परंपरा का सम्मान करते हुए भी चिकित्सा से जुड़ा सच जान सकते हैं। | ଭିନ୍ନ ଭିନ୍ନ ପରିବାର ଓ ସମୁଦାୟ ଭିନ୍ନ ପରମ୍ପରା ମାନନ୍ତି। ଆପଣ ପରମ୍ପରାକୁ ସମ୍ମାନ ଦେଇ ମଧ୍ୟ ଚିକିତ୍ସା ବିଜ୍ଞାନର ସତ୍ୟ ଜାଣିପାରିବେ। | Machine draft | |
| If I get a stain at school, I have to hide it and manage alone. | अगर स्कूल में दाग लग जाए, तो मुझे उसे छिपाकर अकेले ही संभालना होगा। | ସ୍କୁଲରେ ଦାଗ ଲାଗିଗଲେ, ମୋତେ ତାହା ଲୁଚାଇ ଏକା ସମ୍ଭାଳିବାକୁ ପଡ଼ିବ। | Machine draft | |
| Periods can vary, especially in the first few years, and can start suddenly. Carrying a pad in your school bag helps you, or a friend who needs one. Shame and fear of teasing can keep girls away from school, so quiet, kind help matters. | माहवारी अलग-अलग हो सकती है, खासकर शुरुआती कुछ सालों में, और अचानक भी शुरू हो सकती है। स्कूल बैग में एक पैड रखना आपके या ज़रूरत पड़ने पर किसी दोस्त के काम आता है। शर्म और मज़ाक बनने का डर लड़कियों को स्कूल से दूर रख सकता है, इसलिए चुपचाप, प्यार से की गई मदद मायने रखती है। | ମାସିକ ଋତୁସ୍ରାବ ଭିନ୍ନ ଭିନ୍ନ ହୋଇପାରେ, ବିଶେଷକରି ପ୍ରଥମ କିଛି ବର୍ଷରେ, ଏବଂ ହଠାତ୍ ଆରମ୍ଭ ହୋଇପାରେ। ସ୍କୁଲ ବ୍ୟାଗରେ ଗୋଟିଏ ପ୍ୟାଡ୍ ରଖିଲେ ଆପଣଙ୍କ ବା ଦରକାର ପଡ଼ୁଥିବା କୌଣସି ସାଙ୍ଗର କାମରେ ଆସେ। ଲଜ୍ଜା ଓ ଥଟ୍ଟାର ଭୟ ଝିଅମାନଙ୍କୁ ସ୍କୁଲରୁ ଦୂରେଇ ରଖିପାରେ, ତେଣୁ ଚୁପଚାପ୍, ସ୍ନେହର ସହ ସାହାଯ୍ୟ କରିବା ଜରୁରୀ। | Machine draft | |
| Menstruation is a natural bodily process. Stigma about periods can harm a person’s well-being and even how long they stay in school. Some girls avoid school during their period out of fear of bullying. | माहवारी शरीर की एक प्राकृतिक प्रक्रिया है। माहवारी को लेकर शर्म और भेदभाव किसी की सेहत और खुशहाली को, और यहाँ तक कि वह कितने साल पढ़ पाता है, उसे भी नुकसान पहुँचा सकता है। कुछ लड़कियाँ तंग किए जाने के डर से माहवारी के दिनों में स्कूल नहीं जातीं। | ମାସିକ ଋତୁସ୍ରାବ ଶରୀରର ଏକ ପ୍ରାକୃତିକ ପ୍ରକ୍ରିୟା। ଋତୁସ୍ରାବକୁ ନେଇ ଲଜ୍ଜା ଓ ଭେଦଭାବ କାହାର ସ୍ୱାସ୍ଥ୍ୟ ଓ ଭଲ ରହିବାକୁ, ଏପରିକି ସେ କେତେ ବର୍ଷ ପଢ଼ିପାରେ ତାହାକୁ ମଧ୍ୟ କ୍ଷତି କରିପାରେ। କିଛି ଝିଅ ହଇରାଣ ହେବା ଭୟରେ ଋତୁସ୍ରାବ ଦିନମାନଙ୍କରେ ସ୍କୁଲ ଯାଆନ୍ତି ନାହିଁ। | Machine draft | |
| The choice of product is very personal. It depends on what feels comfortable, what is available where you live, cost, and whether you can wash, dry or dispose of it properly. Used disposable pads go in a bin, never down the toilet. | कौन-सा उत्पाद चुनें, यह बहुत निजी फ़ैसला है। यह इस पर निर्भर करता है कि आपको क्या आरामदायक लगता है, आपके इलाके में क्या मिलता है, कीमत क्या है, और क्या आप उसे ठीक से धो, सुखा या फेंक सकते हैं। इस्तेमाल किए गए डिस्पोज़ेबल पैड कूड़ेदान में डालें, शौचालय में कभी नहीं। | କେଉଁ ସାମଗ୍ରୀ ବାଛିବେ, ଏହା ଅତି ବ୍ୟକ୍ତିଗତ ନିଷ୍ପତ୍ତି। ଏହା ନିର୍ଭର କରେ ଆପଣଙ୍କୁ କ’ଣ ଆରାମଦାୟକ ଲାଗେ, ଆପଣଙ୍କ ଅଞ୍ଚଳରେ କ’ଣ ମିଳେ, ଦାମ୍ କେତେ, ଏବଂ ଆପଣ ତାହାକୁ ଠିକ୍ ଭାବେ ଧୋଇ, ଶୁଖାଇ ବା ଫିଙ୍ଗିପାରିବେ କି ନାହିଁ। ବ୍ୟବହୃତ ଡିସପୋଜେବଲ୍ ପ୍ୟାଡ୍ ଡଷ୍ଟବିନ୍‌ରେ ପକାନ୍ତୁ, ଶୌଚାଳୟରେ କେବେ ନୁହେଁ। | Machine draft | |
| WHO: Menstrual health fact sheet | WHO: माहवारी स्वास्थ्य तथ्य पत्र | WHO: ମାସିକ ସ୍ୱାସ୍ଥ୍ୟ ତଥ୍ୟ ପତ୍ର | Machine draft | |
| UNFPA: Menstruation and human rights – FAQ | UNFPA: माहवारी और मानवाधिकार – सामान्य प्रश्न | UNFPA: ମାସିକ ଋତୁସ୍ରାବ ଓ ମାନବାଧିକାର – ସାଧାରଣ ପ୍ରଶ୍ନ | Machine draft | |

### Choose What Fits – product lines re-worded to match the UNICEF guide

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| A menstrual cup can be reused for years. It takes learning, boiling it after each period, and comfort with insertion. | मेंस्ट्रुअल कप को सालों तक दोबारा इस्तेमाल किया जा सकता है। इसके लिए सीखना, हर माहवारी के बाद इसे उबालना, और इसे अंदर लगाने में सहज होना ज़रूरी है। | ମେନ୍‌ଷ୍ଟ୍ରୁଆଲ୍ କପ୍ ବର୍ଷ ବର୍ଷ ଧରି ପୁଣି ବ୍ୟବହାର କରାଯାଇପାରେ। ଏଥିପାଇଁ ଶିଖିବା, ପ୍ରତି ଋତୁସ୍ରାବ ପରେ ଏହାକୁ ଫୁଟାଇବା, ଏବଂ ଭିତରେ ଲଗାଇବାରେ ସହଜ ଅନୁଭବ କରିବା ଦରକାର। | Machine draft | |
| Period underwear is made of absorbent fabric. It can suit some people, but comfort, availability and cost matter. | पीरियड अंडरवियर सोखने वाले कपड़े से बना होता है। यह कुछ लोगों के लिए ठीक हो सकता है, पर आराम, उपलब्धता और कीमत मायने रखते हैं। | ପିରିୟଡ୍ ଅଣ୍ଡରୱେର୍ ଶୋଷିବା ଭଳି କପଡ଼ାରେ ତିଆରି। ଏହା କିଛି ଲୋକଙ୍କ ପାଇଁ ଠିକ୍ ହୋଇପାରେ, କିନ୍ତୁ ଆରାମ, ଉପଲବ୍ଧତା ଓ ଦାମ୍ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। | Machine draft | |

### Classroom view

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Classroom view | क्लासरूम व्यू | କ୍ଲାସରୁମ୍ ଭ୍ୟୁ | Machine draft | |
| CLASS VOTE | कक्षा का मत | ଶ୍ରେଣୀର ମତ | Machine draft | |
| Raise hands for each answer. Count the votes, then click the class’s choice. | हर जवाब के लिए हाथ उठवाएँ। वोट गिनें, फिर कक्षा का चुना हुआ जवाब दबाएँ। | ପ୍ରତ୍ୟେକ ଉତ୍ତର ପାଇଁ ହାତ ଟେକାନ୍ତୁ। ଭୋଟ୍ ଗଣନ୍ତୁ, ତା’ପରେ ଶ୍ରେଣୀର ବଛା ଉତ୍ତର ଦବାନ୍ତୁ। | Machine draft | |
| Add a vote | एक वोट जोड़ें | ଗୋଟିଏ ଭୋଟ୍ ଯୋଡ଼ନ୍ତୁ | Machine draft | |
| Remove a vote | एक वोट हटाएँ | ଗୋଟିଏ ଭୋଟ୍ କାଢ଼ନ୍ତୁ | Machine draft | |
| votes | वोट | ଭୋଟ୍ | Machine draft | |

### Island voyage homepage

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Pick who sails with you, then tap an island to start a story. | चुनें कि आपके साथ कौन सफ़र करेगा, फिर कहानी शुरू करने के लिए किसी द्वीप पर टैप करें। | ବାଛନ୍ତୁ ଆପଣଙ୍କ ସହ କିଏ ଯାତ୍ରା କରିବ, ତା’ପରେ କାହାଣୀ ଆରମ୍ଭ କରିବାକୁ ଏକ ଦ୍ୱୀପ ଉପରେ ଟ୍ୟାପ୍ କରନ୍ତୁ। | Machine draft | |
| Hi! I’m | नमस्ते! मैं हूँ | ନମସ୍କାର! ମୁଁ | Machine draft | |
| Which island shall we sail to? | चलो, किस द्वीप पर चलें? | ଚାଲ, କେଉଁ ଦ୍ୱୀପକୁ ଯିବା? | Machine draft | |
| Sound on | आवाज़ चालू | ଶବ୍ଦ ଚାଲୁ | Machine draft | |
| Sound off | आवाज़ बंद | ଶବ୍ଦ ବନ୍ଦ | Machine draft | |

### Nagar – The Long Journey

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| The Long Journey | लंबा सफ़र | ଲମ୍ବା ଯାତ୍ରା | Machine draft | |
| CHAPTER 05 | अध्याय ०५ | ଅଧ୍ୟାୟ ୦୫ | Machine draft | |
| Periods don’t follow a timetable. | माहवारी किसी टाइम-टेबल से नहीं चलती। | ମାସିକ ଋତୁସ୍ରାବ କୌଣସି ସମୟସାରଣୀ ମାନେ ନାହିଁ। | Machine draft | |
| School trip to the city · A roadside stop | शहर की स्कूल यात्रा · सड़क किनारे एक पड़ाव | ସହରକୁ ସ୍କୁଲ୍ ଭ୍ରମଣ · ରାସ୍ତା କଡ଼ର ଏକ ବିରତି | Machine draft | |
| A JOURNEY TO THE CITY | शहर की ओर एक सफ़र | ସହର ଆଡ଼କୁ ଏକ ଯାତ୍ରା | Machine draft | |
| Ask for help | मदद माँगें | ସାହାଯ୍ୟ ମାଗନ୍ତୁ | Machine draft | |
| What will Aara do? | Aara क्या करेगी? | Aara କ’ଣ କରିବ? | Machine draft | |
| What will Aarav do? | Aarav क्या करेगा? | Aarav କ’ଣ କରିବ? | Machine draft | |
| Oh no. I think my period has started, and we’re still an hour from the city. | अरे नहीं। लगता है मेरी माहवारी शुरू हो गई है, और शहर अभी एक घंटा दूर है। | ଆରେ ନା। ମୋର ବୋଧେ ମାସିକ ଆରମ୍ଭ ହୋଇଗଲା, ଆଉ ସହର ଏବେ ବି ଏକ ଘଣ୍ଟା ଦୂର। | Machine draft | |
| I didn’t pack anything. What if it leaks onto the seat? | मैंने कुछ भी साथ नहीं रखा। अगर सीट पर दाग लग गया तो? | ମୁଁ କିଛି ସାଙ୍ଗରେ ଆଣିନାହିଁ। ଯଦି ସିଟ୍‌ରେ ଦାଗ ଲାଗିଯାଏ? | Machine draft | |
| Quietly tell the teacher at the front. | आगे बैठी टीचर को चुपचाप बताएँ। | ଆଗରେ ବସିଥିବା ଶିକ୍ଷୟିତ୍ରୀଙ୍କୁ ଚୁପଚାପ୍ କୁହନ୍ତୁ। | Machine draft | |
| Ask a friend if she has a spare pad. | किसी सहेली से पूछें कि क्या उसके पास एक पैड है। | କୌଣସି ସାଙ୍ଗକୁ ପଚାରନ୍ତୁ ତା’ ପାଖରେ ଗୋଟିଏ ପ୍ୟାଡ୍ ଅଛି କି। | Machine draft | |
| Say nothing and wait until the museum. | कुछ न कहें और संग्रहालय पहुँचने तक इंतज़ार करें। | କିଛି ନକହି ସଂଗ୍ରହାଳୟ ପହଞ୍ଚିବା ଯାଏ ଅପେକ୍ଷା କରନ୍ତୁ। | Machine draft | |
| Teachers are there to help. A quiet word is enough. | टीचर मदद के लिए ही होते हैं। चुपचाप एक बात कह देना काफ़ी है। | ଶିକ୍ଷକମାନେ ସାହାଯ୍ୟ ପାଇଁ ଅଛନ୍ତି। ଚୁପଚାପ୍ ଗୋଟିଏ କଥା କହିଦେବା ଯଥେଷ୍ଟ। | Machine draft | |
| Many people carry a spare pad. Asking for one is normal. | कई लोग एक अतिरिक्त पैड साथ रखते हैं। एक माँगना बिल्कुल सामान्य है। | ଅନେକେ ଗୋଟିଏ ଅତିରିକ୍ତ ପ୍ୟାଡ୍ ସାଙ୍ଗରେ ରଖନ୍ତି। ଗୋଟିଏ ମାଗିବା ସ୍ୱାଭାବିକ। | Machine draft | |
| Waiting alone can feel worse. There is usually someone who can help. | अकेले इंतज़ार करना और मुश्किल लग सकता है। आमतौर पर कोई न कोई मदद कर सकता है। | ଏକା ଅପେକ୍ଷା କରିବା ଆହୁରି କଷ୍ଟକର ଲାଗିପାରେ। ସାଧାରଣତଃ କେହି ନା କେହି ସାହାଯ୍ୟ କରିପାରନ୍ତି। | Machine draft | |
| Ma’am said we’ll stop at the next roadside stop, and nobody else needs to know. | Ma’am ने कहा कि हम अगले पड़ाव पर रुकेंगे, और किसी और को पता चलने की ज़रूरत नहीं। | Ma’am କହିଲେ ଆମେ ପରବର୍ତ୍ତୀ ବିରତିରେ ଅଟକିବା, ଆଉ ଅନ୍ୟ କାହାକୁ ଜଣାଇବା ଦରକାର ନାହିଁ। | Machine draft | |
| That was easier than I thought. | यह मेरी सोच से कहीं आसान था। | ଏହା ମୁଁ ଭାବିଥିବାଠାରୁ ସହଜ ଥିଲା। | Machine draft | |
| Meera gave me one pad from her bag. But it’s a long day, so I’ll need more. | Meera ने अपने बैग से मुझे एक पैड दिया। पर दिन लंबा है, तो मुझे और चाहिए होंगे। | Meera ତା’ ବ୍ୟାଗରୁ ମୋତେ ଗୋଟିଏ ପ୍ୟାଡ୍ ଦେଲା। କିନ୍ତୁ ଦିନଟି ଲମ୍ବା, ତେଣୁ ମୋତେ ଆହୁରି ଦରକାର ହେବ। | Machine draft | |
| I’m glad I asked instead of worrying alone. | अच्छा हुआ कि अकेले परेशान होने की बजाय मैंने पूछ लिया। | ଭଲ ହେଲା ଯେ ଏକା ଚିନ୍ତା କରିବା ବଦଳରେ ମୁଁ ପଚାରିଲି। | Machine draft | |
| I kept quiet, but I couldn’t stop worrying the whole way. | मैं चुप रही, पर पूरे रास्ते चिंता करती रही। | ମୁଁ ଚୁପ୍ ରହିଲି, କିନ୍ତୁ ପୂରା ବାଟ ଚିନ୍ତା କରୁଥିଲି। | Machine draft | |
| At the next stop I told Ma’am. She helped right away. | अगले पड़ाव पर मैंने Ma’am को बताया। उन्होंने तुरंत मदद की। | ପରବର୍ତ୍ତୀ ବିରତିରେ ମୁଁ Ma’am ଙ୍କୁ କହିଲି। ସେ ତୁରନ୍ତ ସାହାଯ୍ୟ କଲେ। | Machine draft | |
| The bus stopped near a chemist. Ma’am asked Aarav to buy a packet of pads while I use the restroom. | बस एक केमिस्ट की दुकान के पास रुकी। जब तक मैं शौचालय गई, Ma’am ने Aarav से पैड का एक पैकेट लाने को कहा। | ବସ୍ ଏକ ଔଷଧ ଦୋକାନ ପାଖରେ ଅଟକିଲା। ମୁଁ ଶୌଚାଳୟ ଯାଉଥିବା ବେଳେ Ma’am Aarav କୁ ଏକ ପ୍ୟାକେଟ୍ ପ୍ୟାଡ୍ କିଣିବାକୁ କହିଲେ। | Machine draft | |
| Ma’am gave me money for pads. A few boys from our class are watching me at the counter. | Ma’am ने मुझे पैड के लिए पैसे दिए। हमारी कक्षा के कुछ लड़के मुझे काउंटर पर देख रहे हैं। | Ma’am ମୋତେ ପ୍ୟାଡ୍ ପାଇଁ ପଇସା ଦେଲେ। ଆମ କ୍ଲାସର କିଛି ପିଲା ମୋତେ କାଉଣ୍ଟରରେ ଦେଖୁଛନ୍ତି। | Machine draft | |
| The shopkeeper is wrapping the packet in newspaper and a black bag, as if it’s a secret. | दुकानदार पैकेट को अख़बार और काली थैली में लपेट रहा है, जैसे यह कोई राज़ हो। | ଦୋକାନୀ ପ୍ୟାକେଟ୍‌କୁ ଖବରକାଗଜ ଓ କଳା ଥଳିରେ ଗୁଡ଼ାଉଛି, ଯେମିତି ଏହା କିଛି ଗୁପ୍ତ କଥା। | Machine draft | |
| Take the black bag and hurry back. | काली थैली लेकर जल्दी से वापस जाएँ। | କଳା ଥଳି ନେଇ ଶୀଘ୍ର ଫେରିଆସନ୍ତୁ। | Machine draft | |
| “No need to hide it, thank you,” and walk back. | “छिपाने की ज़रूरत नहीं, धन्यवाद,” कहकर वापस जाएँ। | “ଲୁଚାଇବା ଦରକାର ନାହିଁ, ଧନ୍ୟବାଦ,” କହି ଫେରିଆସନ୍ତୁ। | Machine draft | |
| Laugh it off with the boys watching. | देख रहे लड़कों के साथ इसे हँसी में उड़ा दें। | ଦେଖୁଥିବା ପିଲାମାନଙ୍କ ସହ ଏହାକୁ ହସରେ ଉଡ଼ାଇଦିଅନ୍ତୁ। | Machine draft | |
| Being discreet is fine, but buying pads is nothing to be ashamed of. | निजता रखना ठीक है, पर पैड खरीदने में शर्म की कोई बात नहीं। | ଗୋପନୀୟତା ରଖିବା ଠିକ୍, କିନ୍ତୁ ପ୍ୟାଡ୍ କିଣିବାରେ ଲଜ୍ଜାର କିଛି ନାହିଁ। | Machine draft | |
| Treating pads as an everyday item helps make periods less of a secret. | पैड को रोज़ की आम चीज़ की तरह लेने से माहवारी कम छिपाने वाली बात बनती है। | ପ୍ୟାଡ୍‌କୁ ଦୈନନ୍ଦିନ ଜିନିଷ ଭଳି ଦେଖିଲେ ମାସିକ ଋତୁସ୍ରାବ କମ୍ ଗୁପ୍ତ ବିଷୟ ହୁଏ। | Machine draft | |
| A joke can make it awkward for Aara later, even if no one means harm. | मज़ाक बाद में Aara के लिए अजीब स्थिति बना सकता है, भले ही किसी का इरादा बुरा न हो। | ଥଟ୍ଟା ପରେ Aara ପାଇଁ ଅସହଜ ସ୍ଥିତି ସୃଷ୍ଟି କରିପାରେ, ଯଦିଓ କାହାର ଖରାପ ଉଦ୍ଦେଶ୍ୟ ନଥାଏ। | Machine draft | |
| I rushed back, feeling awkward for no reason. | मैं जल्दी-जल्दी लौटा, बेवजह अजीब महसूस करते हुए। | ମୁଁ ବିନା କାରଣରେ ଅସହଜ ଅନୁଭବ କରି ଶୀଘ୍ର ଫେରିଲି। | Machine draft | |
| Next time I’ll just carry it like anything else from a shop. | अगली बार मैं इसे दुकान की किसी भी और चीज़ की तरह ले जाऊँगा। | ପରବର୍ତ୍ତୀ ଥର ମୁଁ ଏହାକୁ ଦୋକାନର ଅନ୍ୟ ଯେକୌଣସି ଜିନିଷ ଭଳି ନେଇଯିବି। | Machine draft | |
| One of the boys asked what I bought. I said, ‘Pads, for someone who needs them.’ | एक लड़के ने पूछा कि मैंने क्या खरीदा। मैंने कहा, ‘पैड, किसी को ज़रूरत है।’ | ଜଣେ ପିଲା ପଚାରିଲା ମୁଁ କ’ଣ କିଣିଲି। ମୁଁ କହିଲି, ‘ପ୍ୟାଡ୍, ଯାହାର ଦରକାର ତା’ ପାଇଁ।’ | Machine draft | |
| He just nodded. It wasn’t a big deal at all. | उसने बस सिर हिलाया। यह कोई बड़ी बात थी ही नहीं। | ସେ କେବଳ ମୁଣ୍ଡ ହଲାଇଲା। ଏହା କିଛି ବଡ଼ କଥା ନଥିଲା। | Machine draft | |
| I joked about it, and the boys laughed all the way back to the bus. | मैंने इस पर मज़ाक किया, और लड़के बस तक हँसते रहे। | ମୁଁ ଏହାକୁ ନେଇ ଥଟ୍ଟା କଲି, ଆଉ ପିଲାମାନେ ବସ୍ ପର୍ଯ୍ୟନ୍ତ ହସୁଥିଲେ। | Machine draft | |
| Then I saw Aara’s face. I stopped and said sorry. | फिर मैंने Aara का चेहरा देखा। मैं रुका और माफ़ी माँगी। | ତା’ପରେ ମୁଁ Aara ର ମୁହଁ ଦେଖିଲି। ମୁଁ ଅଟକିଲି ଓ କ୍ଷମା ମାଗିଲି। | Machine draft | |
| Periods don’t follow a timetable. A little planning and a lot of kindness go a long way. | माहवारी किसी टाइम-टेबल से नहीं चलती। थोड़ी तैयारी और ढेर सारी दयालुता बहुत काम आती है। | ମାସିକ ଋତୁସ୍ରାବ କୌଣସି ସମୟସାରଣୀ ମାନେ ନାହିଁ। ଟିକିଏ ପ୍ରସ୍ତୁତି ଓ ଅନେକ ଦୟା ବହୁତ କାମରେ ଆସେ। | Machine draft | |
| If my period starts while travelling, I have to manage on my own. | अगर सफ़र में माहवारी शुरू हो जाए, तो मुझे सब अकेले ही संभालना होगा। | ଯାତ୍ରା ସମୟରେ ମାସିକ ଆରମ୍ଭ ହେଲେ, ମୋତେ ସବୁ ଏକା ସମ୍ଭାଳିବାକୁ ପଡ଼ିବ। | Machine draft | |
| Periods can vary and can start suddenly, especially in the first few years. Carrying a pad and a small bag for used products helps when you are away from home. Everyone needs a clean, private place to change. Used pads go in a bin, never down the toilet. | माहवारी अलग-अलग हो सकती है और अचानक शुरू हो सकती है, खासकर शुरुआती कुछ सालों में। घर से बाहर हों तो एक पैड और इस्तेमाल किए गए उत्पाद के लिए एक छोटी थैली साथ रखना मदद करता है। हर किसी को बदलने के लिए एक साफ़, निजी जगह चाहिए। इस्तेमाल किए गए पैड कूड़ेदान में डालें, शौचालय में कभी नहीं। | ମାସିକ ଋତୁସ୍ରାବ ଭିନ୍ନ ହୋଇପାରେ ଓ ହଠାତ୍ ଆରମ୍ଭ ହୋଇପାରେ, ବିଶେଷକରି ପ୍ରଥମ କିଛି ବର୍ଷରେ। ଘର ବାହାରେ ଥିଲେ ଗୋଟିଏ ପ୍ୟାଡ୍ ଓ ବ୍ୟବହୃତ ସାମଗ୍ରୀ ପାଇଁ ଏକ ଛୋଟ ଥଳି ସାଙ୍ଗରେ ରଖିବା ସାହାଯ୍ୟ କରେ। ପ୍ରତ୍ୟେକଙ୍କୁ ବଦଳାଇବା ପାଇଁ ଏକ ସଫା, ଘରୋଇ ସ୍ଥାନ ଦରକାର। ବ୍ୟବହୃତ ପ୍ୟାଡ୍ ଡଷ୍ଟବିନ୍‌ରେ ପକାନ୍ତୁ, ଶୌଚାଳୟରେ କେବେ ନୁହେଁ। | Machine draft | |
| Plan a little. Ask for help. Never make it a secret or a joke. | थोड़ी तैयारी करें। मदद माँगें। इसे कभी राज़ या मज़ाक न बनाएँ। | ଟିକିଏ ପ୍ରସ୍ତୁତ ରୁହନ୍ତୁ। ସାହାଯ୍ୟ ମାଗନ୍ତୁ। ଏହାକୁ କେବେ ଗୁପ୍ତ କଥା ବା ଥଟ୍ଟା କରନ୍ତୁ ନାହିଁ। | Machine draft | |
| Thank you, Aarav. Next time I’ll keep a small period kit in my bag. | शुक्रिया, Aarav। अगली बार मैं अपने बैग में एक छोटी पीरियड किट रखूँगी। | ଧନ୍ୟବାଦ, Aarav। ପରବର୍ତ୍ତୀ ଥର ମୁଁ ମୋ ବ୍ୟାଗରେ ଏକ ଛୋଟ ପିରିୟଡ୍ କିଟ୍ ରଖିବି। | Machine draft | |
| And I’ll remember that buying pads is just like buying anything else. | और मैं याद रखूँगा कि पैड खरीदना किसी भी और चीज़ को खरीदने जैसा ही है। | ଆଉ ମୁଁ ମନେ ରଖିବି ଯେ ପ୍ୟାଡ୍ କିଣିବା ଅନ୍ୟ ଯେକୌଣସି ଜିନିଷ କିଣିବା ଭଳି। | Machine draft | |
| What would you put in a small period kit for a trip, and who could you ask for help on the way? | सफ़र के लिए एक छोटी पीरियड किट में आप क्या रखेंगे, और रास्ते में किससे मदद माँग सकते हैं? | ଯାତ୍ରା ପାଇଁ ଏକ ଛୋଟ ପିରିୟଡ୍ କିଟ୍‌ରେ ଆପଣ କ’ଣ ରଖିବେ, ଆଉ ବାଟରେ କାହାକୁ ସାହାଯ୍ୟ ମାଗିପାରିବେ? | Machine draft | |

### "Say it your way" voice preview

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Tap to speak | बोलने के लिए टैप करें | କହିବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ | Machine draft | |
| Say it your way | अपने शब्दों में कहें | ନିଜ ଭାଷାରେ କୁହନ୍ତୁ | Machine draft | |
| Preview | झलक | ଝଲକ | Machine draft | |
| Coming soon: answer in your own words | जल्द आ रहा है: अपने शब्दों में जवाब दें | ଶୀଘ୍ର ଆସୁଛି: ନିଜ ଭାଷାରେ ଉତ୍ତର ଦିଅନ୍ତୁ | Machine draft | |
| Speak in Hindi, Odia or English. | हिंदी, ओड़िया या अंग्रेज़ी में बोलें। | ହିନ୍ଦୀ, ଓଡ଼ିଆ ବା ଇଂରାଜୀରେ କୁହନ୍ତୁ। | Machine draft | |
| RituChakra matches your answer to a reviewed story path. | RituChakra आपके जवाब को जाँची हुई कहानी की किसी राह से मिलाता है। | RituChakra ଆପଣଙ୍କ ଉତ୍ତରକୁ ଯାଞ୍ଚ ହୋଇଥିବା କାହାଣୀର ଏକ ବାଟ ସହ ମିଳାଏ। | Machine draft | |
| The story continues from what you said. | कहानी आपकी कही बात से आगे बढ़ती है। | ଆପଣ କହିଥିବା କଥାରୁ କାହାଣୀ ଆଗକୁ ବଢ଼େ। | Machine draft | |
| This preview does not use the microphone. Nothing is recorded or stored. | यह झलक माइक्रोफ़ोन का इस्तेमाल नहीं करती। कुछ भी रिकॉर्ड या सेव नहीं होता। | ଏହି ଝଲକ ମାଇକ୍ରୋଫୋନ୍ ବ୍ୟବହାର କରେ ନାହିଁ। କିଛି ରେକର୍ଡ ବା ସେଭ୍ ହୁଏ ନାହିଁ। | Machine draft | |
| Back to the choices | विकल्पों पर वापस | ବିକଳ୍ପକୁ ଫେରନ୍ତୁ | Machine draft | |

### The Stain – Aarav's view first

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| Thank you for asking quietly. Give me a moment to think. | चुपचाप पूछने के लिए शुक्रिया। मुझे थोड़ा सोचने दो। | ଚୁପଚାପ୍ ପଚାରିଥିବାରୁ ଧନ୍ୟବାଦ। ମୋତେ ଟିକିଏ ଭାବିବାକୁ ଦିଅ। | Machine draft | |
| Step into Aara’s view | Aara की नज़र से देखें | Aaraଙ୍କ ଦୃଷ୍ଟିରୁ ଦେଖନ୍ତୁ | Machine draft | |

### Choose What Fits – shortened existing line (unsourced second sentence removed)

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| A disposable pad could be practical if I already feel comfortable using it. | अगर मुझे इसे इस्तेमाल करना पहले से सहज लगता है, तो एक बार इस्तेमाल वाला पैड सुविधाजनक हो सकता है। | ଯଦି ଏହା ବ୍ୟବହାର କରିବାରେ ମୁଁ ଆଗରୁ ସହଜ ଅନୁଭବ କରେ, ତେବେ ଥରେ ବ୍ୟବହାର କରି ଫିଙ୍ଗାଯାଉଥିବା ପ୍ୟାଡ୍ ସୁବିଧାଜନକ ହୋଇପାରେ। | Machine draft | |

## Existing text flagged during the upgrade

| English | Issue | Status |
|---|---|---|
| I mentioned needing a pad. A classmate said, ‘Why so serious? Is it a period emergency?’ | HI says एक दोस्त (a friend) but EN says a classmate; OR says ସହପାଠୀ (classmate). Inner quotes changed to ‘ ’ in all languages. | Needs review |

## Review checklist

- The meaning matches the English, especially in the Science Checks (see `docs/health-evidence-register.md`).
- It sounds natural to an 11–16-year-old when read aloud. Dadi sounds warm, never harsh.
- Period words are consistent: HI माहवारी, OR ମାସିକ ଋତୁସ୍ରାବ.
- Character names stay in Latin script (Aara, Aarav, Dadi).
- No text overflows on a 375 px phone or on the projector at 1366×768.
