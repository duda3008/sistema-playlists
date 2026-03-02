

     import { atualizarCabecalho, checkLog } from "./funcoes_reutilizavel.js";
checkLog();
atualizarCabecalho();

// Função para renderizar as perguntas
function renderFAQ(faqs) {
    const faqList = document.getElementById('faq-list');
    faqList.innerHTML = '';
    
    console.log('Dados recebidos para renderização:', faqs); // Debug
    
    if (!faqs || faqs.length === 0) {
        faqList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhuma pergunta disponível no momento.</p>';
        return;
    }
    
    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                <h3>${faq.pergunta}</h3>
                <div class="faq-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="faq-answer">
                <p>${faq.descricao}</p>
            </div>
        `;
        
        faqList.appendChild(faqItem);
        
       
        const question = faqItem.querySelector('.faq-question');
        question.addEventListener('click', () => {
         
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
          
            faqItem.classList.toggle('active');
        });
    });
}

async function fetchFAQsFromPHP() {
   const result = await  fetch('api/faq.php')
        .then(response => response.json())
        
            if (result.type === 'success' && result.data) {
                renderFAQ(result.data);
            } else {
                console.log(result.message || 'Erro ao carregar FAQs');
                console.error('Erro ao carregar FAQs:', error);
             
                const fallbackFAQs = [
                    {
                        pergunta: "Como faço para criar minha conta?",
                        descricao: "É só acessar a página de cadastro, preencher seus dados e confirmar. Rapidinho, sem burocracia. Por favor não esqueça de inserir todos os dados."
                    },
                    {
                        pergunta: "Como altero meus dados pessoais?",
                        descricao: "Entre no seu perfil, clique em 'Editar' e salve as alterações. Simples e sem mistério."
                    }
                ];
                renderFAQ(fallbackFAQs);
            }
        
}
      
        

// Inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    fetchFAQsFromPHP();
});