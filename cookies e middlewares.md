Cookies
Os cookies são arquivos de texto que ficam armazenados no navegador do usuário
Ex:

Um carrinho de compras num ecomerce, suas compras são armazenadas no carrinho por causa deles.


Sessões
As sessões dependem dos cookies mas ficam salvas no servidor
Os Cookies são referência para as sessões 


Middlewares
O middleware é um pequeno pedaço que intermedia a request (requisição) do user para o servidor
Ele fica rodando durante toda a aplicação como um 'espião', todas as requisições passam por ele
Com ele é possível manipular as informações antes que elas cheguem ao destino final 

Criando middlewares
    app.use((req, res, next)=>{
        console.log(`Im Middleware`)
    })

Colocando dessa forma (apenas isso) o navegador vai ficar num loading infinito pois ele fica 'preso' no middleware.

É necessário por isso também dentro do primeiro callback: next() deixando dessa forma:
    app.use((req, res, next)=>{
        console.log(`Im Middleware`)
        next();  Ele manda passar a requisição:
    })



