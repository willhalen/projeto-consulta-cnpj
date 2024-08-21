document.getElementById('consultar-btn').addEventListener('click', function() {
    const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
    if (cnpj.length !== 14) {
        alert('Por favor, insira um CNPJ válido.');
        return;
    }

    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('CNPJ não encontrado.');
                return;
            }
            exibirDados(data);
        })
        .catch(error => console.error('Erro ao consultar a API:', error));
});

function exibirDados(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <div class="form-group">
            <h2>Informações da Empresa</h2>
            <label>Nome:</label><input type="text" value="${data.nome}" /><br>
            <label>Razão Social:</label><input type="text" value="${data.razao_social}" /><br>
            <label>Data de Abertura:</label><input type="text" value="${data.data_inicio_atividade}" /><br>
            <label>Situação:</label><input type="text" value="${data.situacao}" /><br>
            <label>Atividade Principal:</label><input type="text" value="${data.cnae_fiscal_descricao}" /><br>
            <label>Endereço Completo:</label><input type="text" value="${data.logradouro}, ${data.numero}, ${data.municipio} - ${data.uf}" /><br>
            <label>Telefone:</label><input type="text" value="${data.ddd_telefone_1}" /><br>
            <label>E-mail:</label><input type="text" value="${data.correio_eletronico}" /><br>
            <h3>Sócios</h3>
            ${data.qsa.map(socio => `
                <div class="card-socio">
                    <label>Nome do Sócio:</label><input type="text" value="${socio.nome_socio}" /><br>
                    <label>Qualificação:</label><input type="text" value="${socio.qualificacao_socio}" />
                </div>
        </div>
        `).join('')}
    `;
}
