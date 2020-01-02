import secret from '../public/secret';
export default async function (input_Tone_Analysis) {
  return new Promise(function (resolve, reject) {
    const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
    const { IamAuthenticator } = require('ibm-watson/auth');

    // set apikey and url
    const toneAnalyzer = new ToneAnalyzerV3({
      version: '2016-05-19',
      authenticator: new IamAuthenticator({
        apikey: secret.TAapikey,
      }),
      url: secret.TAurl,
    });


    // set Tone_Analysis parameter
    const toneParams = {
      toneInput: { 'text': input_Tone_Analysis },
      contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {
        const data = JSON.stringify(toneAnalysis, null, 2);
        // console.log(data);
        resolve(JSON.parse(data).result);
      })
      .catch(err => {
        console.log('error:', err);
      });
  })
}

// input from translate --->阿棋
// input = 'Team, I know that times are tough! Product '
//   + 'sales have been disappointing for the past three '
//   + 'quarters. We have a competitive product, but we '
//   + 'need to do a better job of selling it!';
