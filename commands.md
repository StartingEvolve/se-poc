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
