import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


//tabs based app
const navStyle = {
    navBarTextFontSize: 20,
    navBarTextColor: '#ffffff',
    navBarTextFontFamily: 'RobotoCondensed-Bold',
    navBarTitleTextCentered: true, //android only
    navBarBackgroundColor: '#00ADA9'
}

const navLeftButton = (sources) => {
    return {
        title: 'Drawer',
        id: 'DrawerButton',
        icon: sources[0],
        disableIconTint: true,
        buttonColor: 'white'
    }
}

const navRightButton = (icon) => {
    return {
        title: 'List',
        id: 'ListButton',
        icon: icon,
        disableIconTint: true,
        buttonColor: 'white'
    }
}

const LoadTabs = () => {

    Promise.all([
        Icon.getImageSource('bars', 20, 'white'),
        Icon.getImageSource('dollar', 20, 'white'),
        Icon.getImageSource('pie-chart', 20, 'white'),
        Icon.getImageSource('list', 20, 'white'),
    ]).then( (sources) => {
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen: "prototipo.HelloScreen",
                    label: "Meus Gastos",
                    title: "Meus Gastos",
                    icon: sources[2],
                    navigatorStyle: navStyle,
                    navigatorButtons:{
                        // leftButtons:[navLeftButton(sources)],
                        rightButtons:[navRightButton(sources[3])]
                    }
                },
                // {
                //     screen: "prototipo.HomeScreen",
                //     label: "Home",
                //     title: "Home",
                //     icon: sources[1],
                //     navigatorStyle: navStyle,
                //     navigatorButtons:{
                //         leftButtons:[navLeftButton(sources)]
                //     }
                // },
                {
                    screen: "prototipo.Gastos.Inserir",
                    label: "Inserir Gasto",
                    title: "Inserir Gasto",
                    icon: sources[1],
                    navigatorStyle: navStyle,
                    navigatorButtons:{
                        // leftButtons:[navLeftButton(sources)],
                        // rightButtons:[navRightButton(sources[3])]
                    }
                }
            ],
            tabsStyle:{
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#017374',
                tabBarBackgroundColor: 'white',
                tabBarTranslucent: false
            },
            appStyle:{
                tabBarButtonColor: 'grey',
                tabBarSelectedButtonColor: '#017374',
                tabBarBackgroundColor: 'white',
                navBarButtonColor: '#fff',
                keepStyleAcrossPush: true
            },
            // drawer: {
            //     left: {
            //         screen: "sellitApp.SidedrawerComponent",
            //         fixedWidth: 500
            //     }
            // }
        })
    })

}

export default LoadTabs;