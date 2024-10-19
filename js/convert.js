export function convert(a,pageUrl) {
    //如果host结尾是webvpn.stu.edu.cn
    if(pageUrl.indexOf("webvpn.stu.edu.cn")!=-1){
        return pageUrl;
    }
    var url=new URL(pageUrl);
    var host=url.host;
    var protocol = url.protocol; // 获取当前的协议
    
    // 如果协议是https，将其替换为http
    if (protocol === "https:") {
        protocol = "http:";
    }
    //如果host有端口号
    if(host.indexOf(":")!=-1){
        //将.替换成-
        host=host.replace(/\./g,"-");
        //将:替换成.
        host=host.replace(/:/g,"-");
        //末尾加上-p.webvpn.stu.edu.cn
        host=host+"-p.webvpn.stu.edu.cn:8118";
    }
    else{
        //将.替换成-
        host=host.replace(/\./g,"-");
        host=host+"-s.webvpn.stu.edu.cn:8118";
    }
    //将url的host替换成host
    var newUrl=pageUrl.replace(url.host,host);
    //将url的协议替换成protocol
    newUrl=newUrl.replace(url.protocol,protocol);
    return newUrl;
}