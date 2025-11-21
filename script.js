document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('conteudo-principal');
    const searchButton = document.getElementById('botao-busca');
    const searchInput = document.getElementById('caixa-busca');
    let allData = [];

    // Função para renderizar os artigos na tela
    const renderArticles = (data) => {
        mainContainer.innerHTML = ''; // Limpa o conteúdo atual
        if (data.length === 0) {
            mainContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }

        data.forEach(item => {
            const article = document.createElement('article');

            const title = document.createElement('h2');
            title.textContent = item.nome;

            const description = document.createElement('p');
            description.textContent = item.descricao;

            const uses = document.createElement('p');
            uses.innerHTML = `<strong>Usos:</strong> ${item.usos.join(', ')}`;

            const creator = document.createElement('p');
            creator.innerHTML = `<strong>Criador:</strong> ${item.criador}`;
            
            const year = document.createElement('p');
            year.innerHTML = `<strong>Ano de Criação:</strong> ${item.ano_de_criacao}`;

            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = 'Saiba mais';
            link.target = '_blank'; // Abrir em nova aba

            article.appendChild(title);
            article.appendChild(description);
            article.appendChild(uses);
            article.appendChild(creator);
            article.appendChild(year);
            article.appendChild(link);

            mainContainer.appendChild(article);
        });
    };

    // Função para buscar e filtrar os dados
    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = allData.filter(item => 
            item.nome.toLowerCase().includes(searchTerm) ||
            item.descricao.toLowerCase().includes(searchTerm) ||
            item.usos.join(', ').toLowerCase().includes(searchTerm)
        );
        renderArticles(filteredData);
    };

    // Carrega os dados do JSON e renderiza pela primeira vez
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allData = data; // Armazena os dados originais
            renderArticles(allData); // Renderiza todos os itens inicialmente
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            mainContainer.innerHTML = '<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>';
        });

    // Adiciona os eventos de clique e digitação para a busca
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});