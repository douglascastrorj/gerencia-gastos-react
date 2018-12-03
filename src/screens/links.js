
export const navigatorDeepLink = (event, $this) => {


    if (event.id === 'ListButton') {
        $this.props.navigator.showModal({
            screen: 'prototipo.ListScreen',
            animationType: 'slide-horizontal',
            navigatorStyle: {
                navBarBackgroundColor: '#00ADA9',
                screenBackgroundColor: '#ffffff'
            },
            backButtonHidden: false
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