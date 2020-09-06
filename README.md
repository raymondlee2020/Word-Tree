# Word Tree
> Word Tree 是一個蒐集並視覺化大眾對於不同議題意見的平台，採用 [Express](https://expressjs.com/) 框架實作同時提供網頁與 webhook 服務的 server
## 執行方式

1. 建立包含 Line-Bot 、 IBM Services 、 Mongo Server 金鑰的 Secret.json
2. 執行以下指令
```
// develop
    
npm install
npm test
    
or
    
yarn install
yarn test
    
// production
    
npx babel src --out-dir dist
npm start
```

## 專案特色

### 已實現

- 透過網頁蒐集大眾意見
- 呈現各議題的意見列表
- 針對各議題資料進行字詞分析
- 針對各議題資料進行情緒分析
- 視覺化分析結果(樹狀文字雲)

### 未實現

- 透過聊天機器人增加資料來源
