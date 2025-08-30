# 📁 Diretório de Páginas do Usuário

Este diretório é onde você pode criar suas próprias páginas personalizadas! 🎨

## 🚀 Como Criar uma Nova Página

1. **Crie um novo arquivo `.jsx`** neste diretório
2. **Nomeie o arquivo** usando PascalCase (ex: `MinhaNovaPage.jsx`)
3. **Exporte um componente React** como padrão

### 📝 Estrutura Básica

```jsx
import React from 'react';

const MinhaNovaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Minha Página</h1>
        <p className="text-xl">Conteúdo da minha página personalizada!</p>
      </div>
    </div>
  );
};

export default MinhaNovaPage;
```

## 🎨 Recursos Disponíveis

### Bibliotecas Pré-instaladas
- **React** - Framework principal
- **Framer Motion** - Animações (`import { motion } from 'framer-motion'`)
- **Lucide React** - Ícones (`import { Heart, Star } from 'lucide-react'`)
- **Tailwind CSS** - Estilização (classes CSS utilitárias)

### Componentes UI
Você pode usar os componentes da pasta `src/components/ui/`:
```jsx
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
```

## 📋 Exemplos Incluídos

- **ExamplePage.jsx** - Página simples com gradiente
- **PortfolioPage.jsx** - Portfólio profissional
- **EventLandingPage.jsx** - Landing page de evento

## 🔄 Como Funciona

1. Quando você criar um arquivo `.jsx` aqui, ele será **automaticamente detectado**
2. A página aparecerá na **galeria principal** como um card
3. O **nome do arquivo** será convertido para o título (ex: `MinhaPage.jsx` → "Minha Page")
4. Ao clicar no card, sua página será **renderizada diretamente**

## 💡 Dicas

- Use **Tailwind CSS** para estilização rápida
- Adicione **animações** com Framer Motion para mais dinamismo
- Mantenha o código **limpo e organizado**
- Teste sua página **salvando o arquivo** - ela aparecerá automaticamente!

## 🎯 Próximos Passos

1. Explore os exemplos existentes
2. Crie sua primeira página personalizada
3. Experimente diferentes estilos e animações
4. Compartilhe suas criações!

---

**Divirta-se criando! 🚀✨**

