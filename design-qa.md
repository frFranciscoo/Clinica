# Design QA — Hero aprovado e motion system

## Evidências

- Verdade visual: `design-reference/hero-opcao-2-close-aprovada.png`
- Implementação final: `design-qa/hero-approved-motion-desktop-final.png`
- Comparação conjunta: `design-qa/hero-comparison-final.jpg`
- Hero mobile: `design-qa/hero-approved-motion-mobile.png`
- Carrossel desktop no segundo bloco: `design-qa/treatment-slide-2-motion-desktop.png`
- Carrossel mobile antes da correção: `design-qa/treatment-slide-2-motion-mobile.png`
- Carrossel mobile depois da correção: `design-qa/treatment-slide-2-motion-mobile-fixed.png`
- Espaçamento final da seção de sinais: `design-qa/signals-spacing-final.png`
- Fonte: 1586 × 992 pixels.
- Implementação: viewport de 1440 × 900 CSS pixels, densidade 1×; captura útil de 1425 × 891 pixels por causa da barra nativa do navegador.
- Normalização: a referência foi ajustada para 1425 × 891 pixels antes da comparação conjunta, preservando o mesmo enquadramento horizontal.
- Estado: hero após a animação de entrada; carrossel no segundo bloco após a transição.

## Findings

- Nenhuma diferença P0, P1 ou P2 permaneceu na comparação final.
- O hero preserva a composição aprovada: ambiente clínico suave à esquerda, arco blush, campo coral, mensagem editorial e retrato aproximado do Dr. Evandro sem moldura.
- O retrato usa a fotografia real aprovada. Pequenas diferenças residuais na suavidade do arco foram classificadas como P3 porque não alteram a hierarquia, o recorte nem a identidade visual.

## Superfícies de fidelidade

- **Fontes e tipografia:** Lora permanece nos títulos e Manrope nos textos funcionais, mantendo as quebras, os pesos e a hierarquia já aprovados. Não há truncamento no hero nem no carrossel.
- **Espaçamento e ritmo:** cabeçalho, título, texto, CTA, credenciais e retrato seguem as proporções do mock. Não há rolagem horizontal em 1440 × 900 ou 390 × 844.
- **Cores e tokens:** marfim, coral, blush, carvão e amarelo de apoio continuam derivados da paleta da clínica.
- **Imagem:** o PNG real e transparente do Dr. Evandro foi mantido sem borda, halo ou distorção. O enquadramento termina próximo da cintura, como no visual aprovado.
- **Copy:** título, subtítulo, CTA, CRM, RQE e informação de faixa etária permanecem exatamente como definidos.
- **Movimento:** o hero entra em camadas; imagens usam máscara e escala; os blocos revelam com atraso curto; o retrato e as imagens ganham parallax discreto; depoimentos e footer entram em sequência. `prefers-reduced-motion` desativa o movimento decorativo.

## Histórico de comparação

### Passagem 1 — bloqueada

- **P2 responsivo:** no mobile, as setas do carrossel ficavam posicionadas sobre o texto quando o segundo bloco era exibido.
- Correção: as duas setas foram ancoradas na área fotográfica, com dimensões idênticas e posição fixa para todos os slides.
- Evidência pós-correção: `design-qa/treatment-slide-2-motion-mobile-fixed.png`.

### Passagem 2 — aprovada

- O hero final foi comparado lado a lado com o mock aprovado em `design-qa/hero-comparison-final.jpg`.
- Não restaram diferenças P0, P1 ou P2 acionáveis.

## Validação funcional e responsiva

- Página respondeu com HTTP 200.
- `script.js` passou em `node --check` e `git diff --check` não encontrou erro de whitespace.
- A biblioteca de movimento está servida localmente para não depender de CDN durante a navegação.
- As animações foram confirmadas por estilos de entrada e saída aplicados antes e depois do scroll.
- Menu mobile abriu e navegou para Tratamentos.
- O segundo bloco do carrossel exibiu todo o texto e manteve altura de 490 px no desktop e 710 px no mobile.
- FAQ abriu e atualizou `aria-expanded` para `true`.
- Console do navegador sem erros ou avisos.
- A seção “A pele dá sinais” ficou com 96 px acima e 104 px abaixo no desktop, aproximando os capítulos sem eliminar a respiração visual.

## Focused region comparison

- O hero foi comparado em composição conjunta no viewport desktop.
- O carrossel recebeu comparação focada no segundo bloco em desktop e mobile porque ali existiam os problemas anteriores de corte e posicionamento das setas.

## Follow-up polish

- **P3:** a curva blush do hero é responsiva e, por isso, pode variar alguns pixels em relação ao mock raster em proporções de tela muito diferentes.

**final result: passed**
