# Conhecimentos minimos
* NodeJS
* Typescript
* Angular 2
* Ionic 2
* Firebase

# Configurações basicas
O aplicativo foi desenvolvido na linguagem TypeScript com o framework Ionic 2
Para realizar a instalação do Ionic em sua máquina, você irá precisar do NodeJS com o NPM instalado em sua máquina. Após isso só é necessário realizar a instalação do Ionic em sua máquina com os seguintes comandos:
```nodejs
npm install -g ionic cordova
```

Para mais informações de instalação acesse a página do Ionic 2 oficial:
https://ionicframework.com/docs/

# Configurações iniciais
### 1. Configurar dados do firebase no aplicativo
O aplicativo utiliza como base de dados o Firebase e para isso é necessário criar uma conta neste link:
https://firebase.google.com/
Após isso pegue todos os dados de configurações no console do Firebase
Abra o seguinte arquivo:
```sh
$  superacao-app/app/app.module.ts
```

Utilize algum editor de texto de sua preferência e insira os dados do firebase na seguinte constante:

```typescript
export const firebaseConfig = {
   apiKey: "<YOUR DATAS>",
   authDomain: "<YOUR DATAS>",
   databaseURL: "<YOUR DATAS>",
   storageBucket: "<YOUR DATAS>",
   messagingSenderId: "<YOUR DATAS>"
};
```

### 2. Configurar autenticação com Facebook
Para realizar a autenticação com facebook, é necessário criar um aplicativo no Facebook developers (https://developers.facebook.com/). Após gerar um projeto, você ira precisar do ID e o nome do projeto.

Feito tudo isso, abra o arquivo
```sh
 superacao/config.xml
 ```

Altere os seguintes dados, com o ID e o nome do seu projeto:
```xml
<plugin name="cordova-plugin-facebook4" spec="~1.7.4">
    <variable name="APP_ID" value="<YOUR DATA>" />
    <variable name="APP_NAME" value="<YOUR DATA>" />
</plugin>
```

### 3. Configurar Push Notification
Para realizar os push notification no app, é necessário realizar uma pequena configuração. Para o serviço tambem utilizamos o FCM (Firebase Cloud Message), e para isso, você precisará do "Sender ID" da sua conta firebase (este dado você pode pegar no console do firebase). No mesmo arquivo XML altere os seguintes dados

```xml
<plugin name="phonegap-plugin-push" spec="~1.9.2">
    <variable name="SENDER_ID" value="<YOUR DATA>" />
</plugin>
```

Abra o arquivo package.json e modifique também o seguinte objeto:
```json
    {
      "variables": {
        "SENDER_ID": "<YOUR DATA>"
      },
      "locator": "phonegap-plugin-push"
    }
```

### 4. Geração dos trios
Os trios ainda não são gerados automaticamente, e para fazer o relacionamento entre eles, é necessário o cadastro de um usuário para adquirir, o tipo e o ID dele. Para conseguir esses dados só é necessário cadastrar o usuário. Por padrão o tipo de usuário é setado como "Normal", por isso no próprio console do firebase troque o usuário para o tipo desejado (Superador, Anjo, Arcanjo ou Normal). Após isso abra os seguintes arquivo:

```sh
superacao-app-archangel/src/pages/archangel/chat/chat.ts
```

Após isso encontre a função getTrinityService() e nele, troque os seguintes dados de acordo com o usuário que você deseja relacionar:


##### Arcanjo
```typescript
  function getTrinityService() {
        let trinitys = [{
          overcomer : "<UID DO SUPERADOR DO FIREBASE>",
          angel: "",
          archangel: "<UID DO ARCANJO DO FIREBASE>"
        },
        {
          overcomer : "<UID DO ARCANJO DO SUPERADOR>",
          angel: "",
          archangel: "<UID DO SUPERADOR DO FIREBASE>"
        }];

        return trinitys;
      }
```
##### Observação
**Não é obrigatorio colocar o uid do componente** (Exemplo, se você esta no componente do Superador, não vai precisar colocar o Uid dele mesmo, por isso no exemplo acima eles estão em branco)

# Inicializando aplicativo
Após realizar todas configurações inicias, você pode instalar o app usando o comando:
```nodejs
npm install
```

Para iniciar o aplicativo em modo web (modo navegador), utilize o seguinte comando:

```sh
ionic server
```

Para rodar o aplicativo em um dispositivo android ou ios, é necessário realizar o seguinte comando:
```sh
ionic add platform android
ionic run android
```
ou

```sh
ionic add platform ios
ionic run ios
```
