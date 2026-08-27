# Design QA — Hero opção 1 e tipografia global

## Evidências

- Verdade visual: `design-reference/hero-opcao-1-aprovada.png`
- Implementação final: `design-qa/hero-option1-implementation-final.png`
- Comparação conjunta: `design-qa/hero-option1-comparison-final.jpg`
- Hero mobile: `design-qa/hero-option1-mobile-final.png`
- Fonte: 1586 × 992 pixels.
- Implementação: viewport de 1280 × 720 CSS pixels, densidade 1×.
- Normalização: a referência foi reduzida proporcionalmente para 1151 × 720 e colocada ao lado da captura nativa de 1280 × 720. A diferença de proporção original foi preservada e considerada na avaliação.
- Estado: página inicial, sem hover, elementos do hero já revelados.

## Findings

- Nenhuma diferença P0, P1 ou P2 permaneceu na comparação final.
- A estrutura aprovada foi preservada: 55,6% de superfície marfim e 44,4% de superfície coral, mensagem à esquerda e retrato em escala ampla à direita.
- O retrato da implementação usa o recorte real aprovado do Dr. Evandro. A referência gerada alterava levemente a largura aparente do corpo; manter a identidade fotográfica real foi tratado como uma diferença aceitável de fidelidade.

## Superfícies de fidelidade

- **Fontes e tipografia:** Lora foi carregada para títulos, números e citações; Manrope foi carregada para navegação, corpo, botões, credenciais e textos funcionais. Ambas foram confirmadas por `document.fonts.check`. Hierarquia, quebras e contraste foram inspecionados no desktop e no mobile.
- **Espaçamento e ritmo:** cabeçalho, divisão do hero, recuo editorial do texto, regra vertical, CTA e credenciais seguem a hierarquia da referência. O conteúdo permanece dentro do viewport sem rolagem horizontal.
- **Cores e tokens:** marfim, coral, carvão e amarelo de apoio continuam derivados dos tokens existentes da clínica. Não foram introduzidos gradientes ou superfícies alheias à referência.
- **Imagem:** o PNG RGBA real de 1122 × 1402 carregou sem erro, sem halo e com recorte natural sobre a superfície coral.
- **Copy:** título, texto de apoio, CRM, RQE, faixa etária e chamada para agendamento correspondem ao conteúdo aprovado.

## Histórico de comparação

### Passagem 1 — bloqueada

- **P1:** hero curto demais, permitindo que a seção seguinte aparecesse no primeiro viewport.
- **P1:** retrato pequeno em relação ao campo coral.
- **P2:** cabeçalho, CTA e margens laterais não acompanhavam a escala da referência.
- Correções: hero passou a ocupar 100dvh; retrato foi ampliado com origem na base; cabeçalho e CTA foram recalibrados; coluna de texto recebeu recuo proporcional.

### Passagem 2 — bloqueada

- **P2:** título e pilha de conteúdo tinham densidade vertical maior que a referência.
- Correções: escala, entrelinha e distâncias entre texto, botão e credenciais foram compactadas e comparadas novamente.

### Passagem 3 — aprovada

- A comparação conjunta não apresentou diferenças P0, P1 ou P2 acionáveis.
- A diferença residual no corpo do retrato é consequência de preservar a fotografia real em vez da anatomia levemente reinterpretada no mock gerado.

## Validação funcional e responsiva

- Página respondeu com HTTP 200.
- `script.js` passou em `node --check`.
- Todas as oito imagens da página carregaram com `naturalWidth` válido.
- FAQ abriu e atualizou `aria-expanded` para `true`.
- Menu mobile abriu, recebeu a classe `is-open` e fechou novamente.
- Avaliações renderizaram duas faixas: `normal` na superior e `reverse` na inferior.
- Desktop validado em 1280 × 720; mobile validado em 390 × 844.
- Nenhuma largura excedente foi detectada nos dois contextos.

## Focused region comparison

Não foi necessário um recorte adicional: na comparação conjunta de 2430 × 762, tipografia, retrato, botão, credenciais, cabeçalho e divisão de superfícies permanecem legíveis para avaliação direta.

## Follow-up polish

- **P3:** em monitores muito baixos, a barra de rolagem pode ficar visível no primeiro viewport por causa do conteúdo subsequente, sem esconder ou deslocar controles do hero.

**final result: passed**
