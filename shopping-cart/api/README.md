Devido ao limite máximo de requisições permitidas pelo CrudCrud, a API não está mais funcionando.
Entretanto, caso deseje testar o código, basta acessar o site <a href="https://crudcrud.com/">crudcrud.com</a>, copiar o link da API fornecida pelo site e substituir o link no arquivo provider.js (src/provider.js). Além disso, para utilizar cupons de desconto, é necessário enviá-los para a API com apps como Insomnia. Abaixo estão 3 cupons de exemplo para cadastro.

{
"name": "cupom123",
"discountValue": 10,
"available": true
},

{
"name": "desconto15",
"discountValue": 15,
"available": false
},

{
"name":"shopping",
"discountValue": 30,
"available": true,
"minPurchaseValue": 1000
}
