import secret from '../public/secret';
export default async function (text) {

  //取得JSON中key=keywords的內容
  function getJSONValue(result) {
    var str = JSON.stringify(result, null, 2);
    var obj = JSON.parse(str);
    return obj.result.keywords;
  }

  //取得api授權，參考api文件的寫法
  const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    authenticator: new IamAuthenticator({
      apikey: secret.NLUapikey,
    }),
    url: secret.NLUurl,
  });


  //設定需要分析的東西跟參數
  const analyzeParams = {
    'text': text,
    'features': {
      'keywords': {
        'emotion': true,//設定可以分析emotion
        'sentiment': true,//設定可以分析sentiment
        'limit': 200,//可取得10個keywords
      },
    },
  };


  return naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
    // console.log(getJSONValue(analysisResults));//print出結果
    return getJSONValue(analysisResults);//return結果
  });

}