# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### descriere site

### generare poll-uri default
Pentru a genera poll-urile default am creat o functie createDefaultPolls care creaza doua poll-uri si le incarca in baza de date daca ea este goala

### Incarcarea poll-urilor din baza de date se intampla intr-un hook useEffect care se intampla asincron cu incarcarea site-ului, apoi folosind metoda map luam fiecare poll din baza de date si verifica ce tip este. In functie de tipul sau o sa incarce o componenta Poll(single choice) sau MultiplePoll(multiple choice).

### Navbar-ul contine initial butonul de login si register:
	-register-ul o sa verifice intai local daca email-ul este introdus corect si parola sa fie identica cu confirmarea ei, daca nu este asa o sa apara un alert pe ecran. Daca totul merge bine se va crea un nou obiect in users care va contine parola incriptata si email-ul user-ului. De asemenea email-ul este salvat in baza de date lowercase(indiferent de cum l-a introdus user-ul) 
	-login-ul o sa caute in baza de date daca exista un email identic cu cel introdus si apoi o sa compare parola introdusa cu cea din baza de date; daca sunt identice id-ul creat de mongoDB o sa fie stocat local si logarea se efectueaza

	Dupa logare in navbar o sa apara Create Poll si logout-ul
	-Create Poll-ul o sa afiseze pe ecran un pop-up in care poti sa introduci datele necesare pentru a crea un poll si apoi o sa creeze o instanta noua in baza de date pentru acel poll
	-Logout-ul o sa goleasca memoria locala si o sa aduca navbar-ul la starea initiala

### Votarea se intampla cand user-ul este logat, daca nu este logat butonul nu o sa apara. In momentul in care user-ul este logat o sa vada butonul de vote si o sa poata vota, dupa ce a votat id-ul lui o sa fie memorat in poll-ul respectiv din baza de date si o sa dispara butonul de vote

### Stergerea poll-ului se intampla atunci cand userId-ul este identic cu creatorId si se va genera butonul de delete poll care o sa il elimine din baza de date. CreatorId se genereaza atunci cand un user creaza un poll, si o sa memoreze id-ul user-ului logat in acel moment. 

### Pentru partea de responsiveness am incercat sa folosesc cat mai mult bootstrap si flexbox, insa cand am intampinat probleme folosindu-le am setat din css niste limite pentru marimile ecranului si apoi am schimbat respectiv css-ul componentei in functie de ele.
