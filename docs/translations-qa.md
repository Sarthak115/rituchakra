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

### Choose What Fits – shortened existing line (unsourced second sentence removed)

| English | Hindi | Odia | Status | Notes |
|---|---|---|---|---|
| A disposable pad could be practical if I already feel comfortable using it. | अगर मुझे इसे इस्तेमाल करना पहले से सहज लगता है, तो एक बार इस्तेमाल वाला पैड सुविधाजनक हो सकता है। | ଯଦି ଏହା ବ୍ୟବହାର କରିବାରେ ମୁଁ ଆଗରୁ ସହଜ ଅନୁଭବ କରେ, ତେବେ ଥରେ ବ୍ୟବହାର କରି ଫିଙ୍ଗାଯାଉଥିବା ପ୍ୟାଡ୍ ସୁବିଧାଜନକ ହୋଇପାରେ। | Machine draft | |

## Existing text flagged during the upgrade

| English | Issue | Status |
|---|---|---|
| I mentioned needing a pad. A classmate said, ‘Why so serious? Is it a period emergency?’ | HI says एक दोस्त ("a friend") but EN says "a classmate"; OR says ସହପାଠୀ (classmate). Inner quotes changed to ‘ ’ in all languages. | Needs review |

## Review checklist

- The meaning matches the English, especially in the Science Checks (see `docs/health-evidence-register.md`).
- It sounds natural to an 11–16-year-old when read aloud. Dadi sounds warm, never harsh.
- Period words are consistent: HI माहवारी, OR ମାସିକ ଋତୁସ୍ରାବ.
- Character names stay in Latin script (Aara, Aarav, Dadi).
- No text overflows on a 375 px phone or on the projector at 1366×768.
