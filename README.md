
Proof of concept for running [Lighthouse](https://github.com/GoogleChrome/lighthouse) performance benchmarking tests inside an AWS Lambda function.


**Run Locally:**  

```
npm install 

docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs8.10 index.handler
```

<br/>

*Based on  [lighthouse-lambda](https://github.com/joytocode/lighthouse-lambda)*
