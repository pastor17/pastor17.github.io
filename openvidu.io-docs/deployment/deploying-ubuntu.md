<h2 id="section-title">在Ubuntu下部署OpenVidu</h2>
<hr>

## 安装环境

只支持 **Ubuntu Xenial 16.04** 或者 **Ubuntu Bionic 18.04** (参看 [Ubuntu Bionic 限制条件](#ubuntu-bionic-limitations)).

#### 1. 安装 KMS

**Ubuntu Xenial 16.04**

```bash
sudo echo "deb [arch=amd64] http://ubuntu.openvidu.io/6.11.0 xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y install kurento-media-server
```

**Ubuntu Bionic 18.04**

```bash
sudo echo "deb [arch=amd64] http://ubuntu.openvidu.io/6.11.0 bionic kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5AFA7A83
sudo apt-get update
sudo apt-get -y install kurento-media-server
```

安装 KMS后, 使用下面的命令行来修改默认的运行用户:

```bash
sudo sed -i "s/DAEMON_USER=\"kurento\"/DAEMON_USER=\"${USER}\"/g" /etc/default/kurento-media-server
```

#### 2. 安装 COTURN
```bash
sudo apt-get -y install coturn
```

> 这是一个可以实现 STUN/TURN 服务的系统应用, 可以使用户在复杂的网络环境中进行连接通讯. 可以参考文档地址 [这里](https://github.com/coturn/coturn){:target="_blank"}.

#### 3. 安装 Redis
```bash
sudo apt-get -y install redis-server
```

#### 4. File `/etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini`
```console
stunServerAddress=YOUR_MACHINE_PUBLIC_IP
stunServerPort=3478
```

#### 5. File `/etc/turnserver.conf`
```console
external-ip=YOUR_MACHINE_PUBLIC_IP
listening-port=3478
fingerprint
lt-cred-mech
max-port=65535
min-port=40000
pidfile="/var/run/turnserver.pid"
realm=openvidu
simple-log
redis-userdb="ip=127.0.0.1 dbname=0 password=turn connect_timeout=30"
verbose
```

#### 6. 修改文件 `/etc/default/coturn`
```bash
TURNSERVER_ENABLED=1
```

#### 7. 初始化服务
```bash
sudo service redis-server restart
sudo service coturn restart
sudo service kurento-media-server restart
```

#### 8. 初始化运行 Openvidu JAR 服务

```console
java -jar -Dopenvidu.secret=YOUR_SECRET -Dopenvidu.publicurl=https://YOUR_MACHINE_PUBLIC_IP:4443/ openvidu-server-{VERSION}.jar
```

使用 `YOUR_SECRET` 密码用于服务的安装访问. 在访问 OpenVidu 后台管理服务 和接口服务的时候需要用到该密码. 注意防止密码泄漏!

<br>

> **1)** 需要 Java 8 环境来运行 OpenVidu 服务:
> 
> `sudo apt-get install -y openjdk-8-jre`</br>
> 
> **2)** 你可以使用以下命令获得任意的OpenVidu Server  [版本](/releases/){:target="_blank"} . 确保兼容性符合 [发布页面](/releases/){:target="_blank"} 列出的版本号
> 
> `wget https://github.com/OpenVidu/openvidu/releases/download/v{VERSION}/openvidu-server-{VERSION}.jar`</br>
>
> **3)** 如果要启用OpenVidu Server的录制模块来记录会话，则必须安装 [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/){:target="_blank"} 并为命令 `java -jar` 添加 [更多系统属性](/advanced-features/recording/#2-launch-openvidu-server-with-new-properties){:target="_blank"}   . 查看 [录制](/advanced-features/recording){:target="_blank"} 了解更多详情

<br>
使用你 [自己的证书](#using-your-own-certificate) 添加到JAR，而不是使用自签名的默认证书 ( 这将在用户的浏览器上启动安全警告 )

#### 9. 最后检查你的服务器

您可以通过`https://YOUR_OPENVIDU_SERVER_MACHINE_PUBLIC_IP:4443` (用户名:密码 `OPENVIDUAPP:YOUR_SECRET`) 接到OpenVidu仪表板. 确保允许TCP和UDP入站连接到您的计算机！!

要将应用程序连接到OpenVidu Server，请使用相同的URL  `https://YOUR_OPENVIDU_SERVER_MACHINE_PUBLIC_IP:4443`. 要了解更多信息，请查看 [将您的应用程序连接到OpenVidu](/deployment/deploying-app/#connecting-your-external-app-to-openvidu){:target="_blank"}.

<br>

---

## 服务器网络要求

为了使此部署起作用，您必须在托管服务的计算机中满足2组需求:
  
  - 首先，您当然需要机器拥有 **公共的，可达的IP**. 原因很简单：我们正在安装 _COTURN_ 原因很简单：我们正在安装 (**[更多详情](/troubleshooting#6-what-are-stun-and-turn-servers-and-why-do-i-need-them){:target="_blank"}**). 如果 *COTURN* 本身在无法访问的计算机内运行, 则视频传输可能会失败。并且还要确保服务器带宽很重要 , 因为每个媒体连接可能会消耗多达几MB。.

  - 此外，服务器需要在防火墙中打开一些 **端口** :

      - **4443 TCP** (_OpenVidu Server_ 服务器默认侦听端口4443)
      - **3478 TCP** (_COTURN_ 默认侦听端口3478)
      - **40000 - 65535 UDP and TCP** (WebRTC将通过任何这些端口随机交换媒体。如果客户端网络阻止UDP连接，则可能使用TCP)
  
  > 如果你陷入困境仍在，我们提供了一个现成的使用Amazon CloudFormation堆栈可以轻松地在短短几分钟内部署OpenVidu [这里](/deployment/deploying-aws){:target="_blank"}.

<br>

---

## 使用自己的证书

OpenVidu Server是一个Java应用程序, 因此需要Java密钥库 (**.jks**) 来提供安全证书。如果没有，可以从证书和私钥文件 (**.crt** and **.key** , 或者两者都是 **.pem**). 您可以使用 **_openssl_** 和 **_keytool_** 执行生成:

```bash
# 使用 p12 格式的证书 (password 会被询问)
# YOUR_CRT.crt 和 YOUR_KEY.key 文件可能会被 YOUR_CRT.pem 和 YOUR_KEY.pem 文件所替代
openssl pkcs12 -export -name YOUR_KEYSTORE_ALIAS -in YOUR_CRT.crt -inkey YOUR_PRIVATE_KEY.key -out p12keystore.p12

# 生成 jks (password 会被询问)
keytool -importkeystore -srckeystore p12keystore.p12 -srcstoretype pkcs12 -deststoretype pkcs12 -alias YOUR_KEYSTORE_ALIAS -destkeystore YOUR_KEYSTORE_NAME.jks
```

<br>
要使用JKS，只需在启动时为以下OpenVidu Server属性提供适当的值：:

- `server.ssl.key-store`=/PATH/TO/YOUR_KEYSTORE_NAME.jks
- `server.ssl.key-store-password`=value_provided_when_generating_jks
- `server.ssl.key-alias`=YOUR_KEYSTORE_ALIAS

<br>

##### 案例

```bash
java -jar -Dopenvidu.secret=MY_SECRET -Dserver.ssl.key-store=/opt/openvidu/my_keystore.jks -Dserver.ssl.key-store-password=MY_KEYSTORE_SECRET -Dserver.ssl.key-alias=my_cert_alias openvidu-server-2.5.0.jar
```


---

## Ubuntu Bionic 限制

OpenVidu 支持 **Ubuntu Xenial 16.04** and **Ubuntu Bionic 18.04**. OpenCV 过滤将不会被 Bionic 支持.

[音频 和 视频过滤 ](https://openvidu.io/docs/advanced-features/filters/){:target="_blank} 将影响到 *FaceOverlayFilter* and *ChromaFilter*. 事实上, [Kurento Docs](https://doc-kurento.readthedocs.io/en/stable/features/kurento_modules.html){:target="_blank} 中解释的内置模块都不能被使用在 Ubuntu Bionic (*PointerDetectorFilter*, *CrowdDetectorFilter*, *PlateDetectorFIlter*).

*ZBarFilter* and *GStreamer* 过滤可以被 Ubuntu Bionic 使用.

<br>