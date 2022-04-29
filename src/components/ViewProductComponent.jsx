import React, { Component } from 'react'
import ProductService from '../services/Product.service'

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            product: {}
        }
    }

    componentDidMount(){
        ProductService.getProductById(this.state.id).then( res => {
            this.setState({product: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Details Produit</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nom: </label>
                            <div> { this.state.product.nom }</div>
                        </div>
                        <div className = "row">
                            <label> Prix: </label>
                            <div> { this.state.product.prix }</div>
                        </div>
                        <div className = "row">
                            <label> Quantité: </label>
                            <div> { this.state.product.quantite }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProductComponent
