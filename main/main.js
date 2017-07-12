'use strict';

function inputsToInputsInfo(inputs) {
  var j=0;
  var InputsInfo = [{barcode:inputs[0],count:1}];
  var tag = inputs[0];

  for (var i=1; i<inputs.length; i++){
    if(inputs[i]== tag){
      InputsInfo[j].count++;
    }
    else {
      InputsInfo.push({barcode:inputs[i],count:1});
      j++;
      tag = inputs[i];
    }
  }
  return InputsInfo;
}

function toGoodsInfo(InputsInfo,initGoodsInfo) {
  var goodsInfo = [];
  for(var k=0; k<InputsInfo.length; k++)
    for(var m=0; m<initGoodsInfo.length; m++){
    if(InputsInfo[k].barcode == initGoodsInfo[m].barcode) {
      initGoodsInfo[m].count = InputsInfo[k].count;
    }
  }
  for(k=0; k<initGoodsInfo.length; k++)
  {
    if(initGoodsInfo[k].count >0)
    {
      goodsInfo.push(initGoodsInfo[k]);
    }
  }
  return goodsInfo;
}

function countPerPrice (goodsInfo) {
  var perSum=[];
  for (var i=0; i<goodsInfo.length;i++)
  {
    perSum[i]=goodsInfo[i].price*goodsInfo[i].count;
  }
  return perSum;
}

function countTotalPrice(perSum) {
  var totalPrice = 0;
  for (var i=0; i<perSum.length;i++)
  {
    totalPrice+=perSum[i];
  }
  return totalPrice;
}

function printstr (goodsInfo,perSum,totalPrice){
  var str ="***<没钱赚商店>收据***"+'\n';
  for(var i=0; i<goodsInfo.length;i++)
    str+=("名称："+goodsInfo[i].name+"，数量："+goodsInfo[i].count+goodsInfo[i].unit+"，单价："
    +(goodsInfo[i].price).toFixed(2)+"(元)，小计："+perSum[i].toFixed(2)+"(元)"+'\n');
  str+= ("----------------------"+'\n'+"总计："+totalPrice.toFixed(2)+"(元)"+'\n'+"**********************");
  return str;
}

function printReceipt(inputs) {
  var InputsInfo = inputsToInputsInfo(inputs);
  var initGoodsInfo = loadAllItems();
  var goodsInfo = toGoodsInfo(InputsInfo,initGoodsInfo);
  var perSum = countPerPrice(goodsInfo);
  var totalPrice = countTotalPrice(perSum);
  var str = printstr(goodsInfo,perSum,totalPrice);
  console.log(str);
}



