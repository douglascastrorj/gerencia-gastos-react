
const navStyle = {
    navBarTextFontSize: 20,
    navBarTextColor: '#ffffff',
    navBarTextFontFamily: 'RobotoCondensed-Bold',
    navBarTitleTextCentered: true, //android only
    navBarBackgroundColor: '#00ADA9'
}

export const navigatorDeepLink = (event, $this) => {

    if (event.id === 'ListButton') {
        $this.props.navigator.showModal({
            title: 'Lista de Gastos',
            screen: 'prototipo.ListScreen',
            animationType: 'slide-horizontal',
            navigatorStyle: navStyle,
            backButtonHidden: false,
            passProps: {
                gastos: $this.state.gastos
            }
        })
    }

}

export const goToView = (view, $this) => {
    $this.props.navigator.handleDeepLink({
        link: view,
        payload: {
            typeLink: 'view'
        }
    })
}