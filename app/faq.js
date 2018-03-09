/* eslint-env browser */
/* eslint quote-props: ["error", "always"] */
'use strict';

window.faq = {
  'About Crisis Trends Data': {
    'image': 'images/bar-chart.png',
    'questions': {
      'What is Crisis Trends?': 'Crisis Text Line was originally built with two purposes:<ol><li>to provide a free, 24/7 crisis service via text at scale and</li><li>to use the data generated to improve our service and the crisisspace as a whole.</li>Crisis Trends was launched to share the volume, velocity, and varietyof our data with the public.',
      'Why do we share this data?': 'By sharing this data, we hope to:<ol><li>increase public awareness about how crisis and help-seekingoccurs in real-time</li><li>in doing so, decrease stigma around help-seeking</li><li>provide community members, policy makers, journalists, andorganizations with insights to support their efforts to improvepublic mental health.</li></ol>',
      'Where does the data come from?': {
        'How is the data collected?': 'The visualizations you see are powered by data gathered in our conversations with texters. Following each conversation, volunteer Crisis Counselors (CCs) complete a survey and select the issues the texter mentioned. We gather this data so we can better understand the needs of our texters.',
        'How can I filter the data?': 'We only display data above a certain threshold of volume in order to protect texter privacy. Therefore, you can filter the data by time (year, month) and location (state).( We would not, for example, share that 1 texter from Portland, Oregon texted in the last 24 hours about family issues and depression.)',
        'How "real-time" is the data?': 'Crisis Trends is updated daily. The data is normalized by timezone, meaning trends represent when a conversation occurred for the texter.'
      },
      'How does Crisis Trends data compare to other survey data about mental health?': {
        'Representativeness.': 'Given Crisis Text Line data is gathered more naturalistically than a traditional survey, it is representative of a texter-in-crisis population, not the U.S. population as a whole.',
        'Daily data gathering.': 'We gather data every second! Literally. This velocity enables us to explore how crisis trends evolve over time. For example, we see an increase in financial concerns every prom season, and saw a spike in conversations from LGBTQ texters immediately following the 2016 national election results.',
        'Reporting bias.': 'We gather data in the moment, when someone is in crisis, via the texter’s natural language and communication style. Our data is therefore less impacted by variable recall and documented under-reporting in surveys.',
        'Co-occurring issues.': 'We gather data in the context of unique conversations moments. someone is likely to bring up a variety of issues in one conversation, and our data can demonstrate how those issues are linked.'
      },
      'What can / can\'t I do with Crisis Trends data?': {
        '': 'Our goal is to share trends in our data, not to tell you why they occur. We aim to empower you to observe these trends and explore the questions they spark.',
        'You CAN:': '<ul><li>Explore how issues vary across texters from different states.</li><li>Explore how crisis conversations occur in real-time, across the week and different hours of the day.</li><li>Explore trends for a specific issue.</li></ul>',
        'You CAN\'T:': '<ul><li>Infer reason for the trend (but we encourage you to research your hypotheses further!)</li><li>Select a slice of data so narrow that it might compromise texter privacy or provide a skewed view.</li><li>Assume our texter population is representative of the U.S. as a whole. Roughly 75% of our texter population is below 25 years old. That being said, we\'ve exchanged tens of millions of text messages, in every area code in the U.S., so the data on texters in crisis is rich.</li></ul>'
      },
      'What data can I access?': {
        'Are there data for area codes or counties?': 'We currently share data for states, because we have enough volume at a state level to share aggregate trends without risking texter privacy. We will share data at area code and county level when we have sufficient volume to protect texter anonymity.',
        'Do you have data from other countries?': 'Not yet! We started our service in the US in 2013, and in Canada in 2018 - We don’t yet have enough data from Canada to display trends and protect anonymity. You can learn more about our plans for international expansion on our website.',
        'How should I cite this data?': 'We share this data with you so you can share it with others as you see fit. If you do share it, please cite it as: <pre>\"Crisis Trends.\" www.crisistrends.org. Crisis Text Line, March 2018. Web. &lt;Insert your date of access&gt;.</pre> And, let us know at <a href=\"mailto:data@crisistextline.org\">data@crisistextline.org</a>! We would love to maintain a list of how this data is being used so we can trace impact and make improvements as we go.',
        'I\'d like to gather data like this on my specific community.': 'You might be a great fit as a partner. Please complete <a href=\"http://www.surveygizmo.com/s3/2612353/CrisisTextLinePartners\" target=\"_blank\">this survey</a> to learn more.',
        '': 'Questions, suggestions, ideas? We\'d love to hear from you! Email us at <a href=\"mailto:support@crisistextline.org\">support@crisistextline.org</a>'
      }
    }
  },
  'Who texts Crisis Text Line?': {
    'image': 'images/chat-bubble.png',
    'questions': {
      'Where do they come from?': 'We launched our service on August 1, 2013 in Chicago, IL and on September 1, 2013 in El Paso, TX. Within four months, with zero marketing, conversations were logged across all 295 U.S. area codes. Since then, we have processed tens of millions of text messages, from texters across the U.S.',
      'How old are they?': 'Roughly 75% of our texters are below 25 years old.',
      'What is their background?': 'We have texters across all demographics, skewing rural and poor. 19% of our texter volume is from the 10% lowest-income zip codes. 6% of texters report they are Native American and 14% Latino/Hispanic.',
      'What issues are they seeking help for?': 'The issues we encounter span the range of crises, from suicidal ideation to anxiety to romantic relationship concerns. On average, each texter mentions 2-3 issues, as identified by the Crisis Counselor.',
      'How do we know this?': 'Following the close of the conversation, we ask texters to share more information about themselves, if they wish, so that we can better understand who we’re serving and how we can improve the service.'
    }
  }
};
