/* eslint-env browser */
/* eslint quote-props: ["error", "always"] */
'use strict';

window.faq = {
  'About Crisis Trends Data': {
    'image': 'images/bar-chart.png',
    'questions': {
      'Where does the data come from?': {
        'How is the data collected?': 'The visualizations you see are powered by data gathered in our conversations with texters. Following the conversation, volunteer crisis counselors (CCs) complete a survey and select which issues the texter mentioned. We gather this data so that we can get a better understanding of the needs of our texters and how we can best prepare crisis counselors to support them.',
        'How is the data anonymized?': 'To us, texter privacy is first and foremost, always! All data is auto-scrubbed for any personally identifiable information that a texter might share, including names, addresses, dates of birth, phone numbers, and email addresses, prior to sharing with researchers. It is also aggregated before we share it on CrisisTrends.org, because we intend to show you just that, trends!',
        'How can I filter the data?': 'We only display data above a certain threshold of volume in order to protect texter privacy. Therefore, you can filter the data by time (year, month) and location (state). We would not, for example, share that 1 texter from Portland, Oregon texted in the last 24 hours about family issues and depression.',
        'What do the numbers represent on the graphs?': 'Similar to Google Trends, we display trends over time data in terms of relative value. So, we don\'t display the absolute volume of certain issues, but rather the relative volume of conversations citing that issue in comparison to all conversations. In data-speak, we call this normalization. Seeing how issues shift over time, relative to our texter population, enables us to discover insights like concerns about financial issues spike around prom season, or that, in comparison to all other states, Montana has the highest proportion of conversations containing suicidal thoughts, vs. other states.',
        'How "real-time" is the data?': 'The value of our data lies in the fact that it is gathered in real-time. Just as Google Trends can pick up early signals of the flu through day-by-day variability in Google searches, Crisis Trends has the potential to pick up early signals of how external events impact mental health through day-by-day variability in crisis conversation topics. We share this data back to you on a daily basis and enable you to filter by time so you can explore different patterns.',
      },
      'How does Crisis Trends data compare to other survey data about mental health?': {
        'Representativeness.': 'Traditional surveys are good because they target national representativeness, meaning they oversample certain populations when they survey to ensure the final sample of data used for analyses is representative of the U.S. population in terms of demographics, age, gender, etc. Given Crisis Text Line data is gathered more naturalistically, it is representative of a texter-in-crisis population, not the U.S. population; however, this dataset is more useful in a number of ways.',
        'Daily data gathering.': 'Unlike other surveys, which are conducted every year or two years, we gather data every second! Literally. Check here. Then check back tomorrow to see how many new text messages were processed in that time! This velocity of data enables us to explore how crisis occurs in real time and how crisis trends evolve over time. For example, we saw a spike in financial concerns around prom season, a decrease in volume over the summer break, and a spike in conversations tagged with LGBTQ immediately following the Nov 8, 2016 election results.',
        'Reporting bias.': 'Unlike traditional surveys, in which individuals are asked to reflect over the last few months and recall their experiences and emotions, we gather data in-the-moment, when someone is in crisis, via his or her natural language and communication style. Our data is therefore less impacted by variable recall and documented under-reporting in surveys.',
        'Co-occurring issues.': 'Unlike traditional surveys that ask about each mental health concern in isolation, we gather data in the context of unique conversations moments. In one conversation, someone is likely to touch on a variety of issues, and our data can demonstrate how those issues are linked together. For example, we can see in which conversations the texter experienced both suicidal ideation and depression, or what % of bullying conversations also mention self-harm.',
        'Some other mental health surveys and datasets:': '<ul><li><a href=\"http://www.cdc.gov/healthyyouth/data/yrbs/\" target=\"_blank\">CDC\'s Youth Risk Behavior Surveillance (YRBS)</a></li><li><a href=\"http://www.mentalhealthamerica.net/issues/mental-health-america-prevalence-data\" target=\"_blank\">Mental Health in America (MHA)</a></li><li><a href=\"https://www.samhsa.gov/data/node/20\" target=\"_blank\">Substance Abuse and Mental Health Services Administration (SAMHSA)</a></li></ul>',
      },
      'What can / can\'t I do with Crisis Trends data?': {
        '': 'Our goal is to share trends in our data, not to tell you why they occur. We aim to empower you to observe these trends and explore the questions they spark.',
        'You CAN:': '<ul><li>Explore how the issue mix varies across texters from different states.</li><li>Explore how crisis conversations occur in real-time, across the week and different hours of the day.</li><li>Explore trends for a specific issue.</li></ul>',
        'You CAN\'T:': '<ul><li>Infer reason for the trend (but we encourage you to research your hypotheses further!).</li><li>Select too narrow of a slice of data, as that might compromise texter privacy as well as provide a skewed view from a small sample.</li><li>Assume our texter population is representative of the U.S. as a whole. Roughly 75% of our population is below 25 years old. That being said, we\'ve exchanged more than 27M text messages (as of Dec 2016, check now!) since we\'ve launched, in every area code in the U.S., so the data on texters-in-crisis is certainly rich.</li></ul>',
      },
      'Are there data for area codes or counties?': 'We currently share data for states, because we have enough volume at a state level to share aggregate trends without risking texter privacy. We will share data at area code and county level when we have sufficient volume to protect texter anonymity.',
      'Do you have data from other countries?': 'We started our service in 2013 in the U.S. Now, we are excited to be working with partners internationally to increase access to free, 24/7 crisis support via text to people around the world. You can learn more about our plans for international expansion at <a href=\"http://www.crisistextline.org/international/\" target=\"_blank\">Crisis Text Line International</a>.',
      'What\'s the difference between Crisis Trends and Enclave data?': 'As you can see on our <a href=\"http://www.crisistextline.org/open-data/\" target=\"_blank\">Open Data Collaborations page</a>, we share de-identified and aggregated data with academic research partners interested in studying crisis intervention. Again, texter privacy is first and foremost, always! To enable those researchers who pass our application review to ask and answer their proposed questions, we share more specific, raw data, such as the number of conversations with particular issue tags. You can learn more about what is shared in the Enclave Data <a href=\"http://www.crisistextline.org/open-data/application/\" target=\"_blank\">Application</a> and <a href=\"http://www.crisistextline.org/open-data/faq/\" target=\"_blank\">FAQ</a>.',
      'How should I cite this data?': 'We share this data with you so you can share it with others as you see fit. If you do share it, please cite it as: \"Crisis Trends.\" www.crisistrends.org. Crisis Text Line, December 2016. Web. <Insert your date of access>. And, let us know at <a href=\"mailto:data@crisistextline.org\">data@crisistextline.org</a>! We would love to maintain a growing list of how this data is being used so we can trace impact and make improvements as we go.',
    },
  },
  'Who texts Crisis Text Line?': {
    'image': 'images/chat-bubble.png',
    'questions': {
      'Where do they come from?': 'We launched our service in late 2013 by texting 1000 DoSomething.org volunteers and telling them that this new service is available if they or any friends they know might be interested. Within 4 months, with zero marketing, conversations were logged across all 295 U.S. area codes. Since then, we have processed over 27 million text messages (as of Dec 2016), from texters across the U.S.',
      'Who are they?': {
        'How old are they?': 'Roughly 75% of our texters are below 25 years old.',
        'What is their background?': 'We have texters across all demographics, skewing rural and poor. 19% of our texter volume is from the 10 area codes with the lowest average income.',
        'How do we know this?': 'Following the close of the conversation, we ask texters to share more information about themselves, if they wish, so that we can better understand who our service is serving and how we can make it better.',
      },
      'What issues are they seeking help for?': 'The issues we encounter span the range of crises, from suicidal ideation to anxiety to romantic relationship concerns. On average, each texter mentions 1.7 (FIND EXACT NUMBER) issues, as identified by the Crisis Counselor. Roughly xx% (FIND EXACT NUMBER) of our texters text in again within 6 months.',
    },
  },

  'FAQ': {
    'image': 'images/question-mark.png',
    'questions': {
      'What is Crisis Trends?': 'Crisis Text Line was originally built with two purposes: (1) to provide a free, 24/7 crisis service via text at scale and (2) to use the data generated to improve Crisis Text Line as a service as well as the crisis space as a whole. Crisis Trends was launched to share the volume, velocity, and variety of our data with the public.',
      'Why do we share this data?': 'By sharing this data, we hope to: (1) increase public awareness about how crisis and help-seeking occurs in real-time; (2) in doing so, decrease stigma around help-seeking; (3) provide community members, policy makers, journalists and organizations with insights to support their efforts to bring attention to and improve public mental health.',
      'I\'d like to gather data like this on my specific community. What do I do?': 'You might be a great fit as a partner. Please complete [this survey] <INSERT HYPERLINK TO PARTNER SURVEY> to learn more.',
      'What if my question was not answered / I have a really good suggestion?': 'Questions, suggestions, ideas? We\'d love to hear from you! Email us at <a href=\"mailto:data@crisistextline.org\">data@crisistextline.org</a>',
    },
  },
};
