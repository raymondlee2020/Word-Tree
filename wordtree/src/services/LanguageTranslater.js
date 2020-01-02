import secret from '../public/secret';
export default async function (text) {
  const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: secret.LTapikey,
    }),
    url: secret.LTurl,
  });

  const translateParams = {
    text: 'Hello',//輸入翻譯文字
    modelId: 'en-zh-TW',//en是英文,zh-TW是繁體中文
  };

  // languageTranslator.translate(translateParams)
  //   .then(translationResult => {
  //     console.log(JSON.stringify(translationResult, null, 2));
  //   })
  //   .catch(err => {
  //     console.log('error:', err);
  //   });

  const translateParams2 = {
    text: text,
    modelId: 'zh-TW-en',
  };

  const result = languageTranslator.translate(translateParams2)
    .then(translationResult => {
      // console.log(JSON.stringify(translationResult, null, 2));
      return JSON.stringify(translationResult, null, 2)
    })
    .catch(err => {
      console.log('error:', err);
    });

  return result;
}