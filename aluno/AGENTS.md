# Regras do projeto: Mini-loja

## Stack (inegociável)
- Apenas HTML, CSS e JavaScript puro.
- Sem frameworks, sem bibliotecas, sem build, sem Node/npm.
- Sem `import`/`export`: use `<script src="...">` clássico.
  Exponha funções em objetos globais (ex.: `const Logic = { ... }`).
- O projeto roda abrindo `index.html` direto no navegador (file://).

## Arquitetura
- `data.js`: base mockada. **SOMENTE LEITURA. Nunca altere.**
- `logic.js`: regras de negócio puras (sem DOM, sem fetch). Objeto global `Logic`.
- `app.js`: interface (DOM e eventos). Chama `Logic`.
- `tests.js`: testes das regras, executados abrindo `tests.html`.
- `specs/`: uma spec por funcionalidade.

## Fluxo de trabalho (SDD)
1. Nada de código sem spec aprovada em `specs/`.
2. Ordem: spec → plano → tarefas → implementação.
3. Implemente UMA tarefa por vez e pare para eu revisar.
4. Todo critério de aceite da spec precisa de pelo menos um teste em `tests.js`.
5. Se o comportamento mudar, atualize a spec ANTES do código.
6. Em caso de ambiguidade, pergunte. Não invente requisito.

## Código
- Funções pequenas, nomes em português, comentários só quando necessário.
- Não mexa em arquivos fora do escopo da tarefa atual.
- Ao terminar, liste o que mudou e como verificar no navegador.

## Perguntas (ler com atenção)
- Se a spec responde, **não pergunte**. Siga a spec, mesmo que você prefira outra solução.
- Faltou um detalhe que não bloqueia (nome de variável, estilo, posição na tela)? **Decida pela opção mais simples**, registre em uma seção "Premissas" no fim da spec e continue.
- Pergunte **apenas** se houver contradição ou informação faltando que impeça de implementar. Nesse caso, faça no máximo 3 perguntas de uma vez, cada uma com a sua resposta padrão sugerida, e prossiga com a padrão se eu não responder.
- Nunca pergunte "posso continuar?" entre tarefas pequenas. Só pare quando a tarefa atual terminar, como combinado.

## Estilos
- `specs/00-estilos.md` e `style.css` já definem toda a aparência. Leia os dois antes de mexer na interface.
- Use só as classes e variáveis existentes. **Proibido:** `style="..."`, `element.style`, cores ou tamanhos fora das variáveis, `!important` novo, fontes externas, frameworks CSS.
- Mostrar ou ocultar: `classList.add/remove("oculto")`.
- Precisa de uma classe nova? Acrescente no fim de `style.css` usando as variáveis e registre em "Premissas".
- Ao final de cada tarefa de interface, confira os critérios visuais (CV) da spec e os da spec 00 (CS1 a CS7).
