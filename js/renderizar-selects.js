
async function renderizarSelectHumores(selectElement) {
    try {
        const response = await fetch('api/humores.php');
        const result = await response.json();
        
        if (result.type=='success') {
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            
          
            result.data.forEach(humor => {
                const option = document.createElement('option');
                option.value = humor.id_humor;
                option.textContent = `${humor.tipo} - ${humor.descricao}`;
                option.setAttribute('title', humor.descricao); // Tooltip
                selectElement.appendChild(option);
            });
            
            console.log(result.message);
        } else {
            console.log('Erro ao carregar humores:', result.message);
        }
    } catch (error) {
        console.log('Erro ao buscar humores:');
    }
}

async function renderizarSelectGeneros(selectElement) {
    try {
        const response = await fetch('api/generos.php');
        const result = await response.json();
        
        if (result.type=='success') {
            
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            
            result.data.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero.id_genero;
                option.textContent = genero.nome;
                selectElement.appendChild(option);
            });
            
            console.log('Gêneros carregados com sucesso');
        } else {
            console.log('Erro ao carregar gêneros:', result.message);
        }
    } catch (error) {
        console.log('Erro ao buscar gêneros:');
    }
}
export {
  renderizarSelectGeneros,
  renderizarSelectHumores
};