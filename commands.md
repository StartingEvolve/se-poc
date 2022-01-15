Remove main branch and add develop and production

```
git branch develop
git branch production
git push origin develop
git push origin production
git push origin --delete main
git branch -d main
```

Install angular with scss and routing

```
npm install -g @angular/cli@12
ng new se-poc --directory ./ --style=scss --routing --skip-tests
```

### Change files hierarchy

```
ng g m core
ng g m layout
ng g m shared
ng g m styles
ng g m views
mkdir shared/components
mkdir shared/helpers
mkdir shared/pipes
mkdir shared/types
mkdir shared/enums
ng g m features/feature-example --routing
mkdir features/feature-example/components
mkdir features/feature-example/helpers
mkdir features/feature-example/services
mkdir features/feature-example/types
mkdir features/feature-example/views
```

## Ui libraries

### Tailwind

Don't forget to see the last tailwind config in this commit

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss i -p
npm i @tailwindcss/typography
npm i @tailwindcss/forms
npm i @tailwindcss/line-clamp
```

Add imports to styles.scss

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```
