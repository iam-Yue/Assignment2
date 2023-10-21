var arr=[]//存放历史记录
var jieguo=[]//用于存放结果与arr拼接的记录
function insert_num(num){
    document.form.show.value += num
    return document.form.show.value
}
function insert_op(op){
    var text = document.form.show.value
    var len = text.length
    if(text[len-1]<'0'||text[len]>'9'){
        
        document.form.show.value = text.substring(0,text.length-1)
    }
    document.form.show.value += op
}
function display(op){
    var text = document.form.show.value
    text+=op
    document.form.show.value=text
}
function equal(){
    try{
        var exp = document.form.show.value
    if(exp){
        document.form.show.value = eval(exp)  
        if(eval(exp)=="Infinity")
        {
            document.form.show.value="error";
        }
        var result=eval(exp)  
        var xhr= new XMLHttpRequest
        xhr.open('POST','http://127.0.0.1:5000/get_history',true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        const data = {
            calculation: exp,
            result: result
            };
            xhr.send(JSON.stringify(data));
    }    
    }
    catch{
        document.form.show.value = "error"
    }
}
function clean(){
    document.form.show.value = ""
}
function sin(){
    equal()
    var angle = document.form.show.value
    var view =  Math.sin(angle/180*Math.PI)
    view =view.toFixed(2)
    clean()
    document.form.show.value += view           
}
function cos(){
    equal()
    var angle = document.form.show.value
    var view =  Math.cos(angle/180*Math.PI)
    view =view.toFixed(2)
    clean()
    document.form.show.value += view
}
function tan(){
    equal()
    var angle = document.form.show.value
    var view =  Math.tan(angle/180*Math.PI)
    view =view.toFixed(2)
    clean()
    document.form.show.value += view
}
function ln(){
    equal()
    document.form.show.value = Math.log10(document.form.show.value)
}
function back(){
    var text = document.form.show.value
    len = text.length
    document.form.show.value = text.substring(0,text.length-1)
}
function sqrt(){
    equal()
    document.form.show.value = Math.sqrt(document.form.show.value)
}
function factorial(n) {  
    let result = 1
    for(let i = 1; i <= n; i++) {  
        result *= i
    }  
    return result
}
function jiecheng(){
    equal()
    document.form.show.value = factorial(document.form.show.value)
}  
function calculate(str){
    if(str>='0'&&str<='9') insert_num(str) 
    if(str=='+'||str=='*'||str=='/'||str=='-'||str=='.'||str=='%') insert_op(str)
    if(str=='sin') sin()
    if(str=='cos') cos()
    if(str=='tan') tan()
    if(str=='ln') ln()
    if(str=='x!') jiecheng()
    if(str=='=')  equal()
    if(str=='AC') clean()
    if(str=='sqrt') sqrt()
    if(str=='BACK') back()    
    return document.form.show.value
}

function gethistory(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/get_calculation', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            Data = JSON.parse(xhr.responseText);
            array = Data['data'];
            let str="";
            for(let i=0;i<array.length;i++){
                str +=array[i][0]+" = "+array[i][1]+"\n";               
            }
            document.form.show.value=string         
        }
      }
    };
    xhr.send();
 }
