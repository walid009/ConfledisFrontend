import React, { Component } from 'react'
import ProductService from '../services/Product.service';

class CreateProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nom: '',
            prix: '',
            quantite: ''
        }
        this.changeNomHandler = this.changeNomHandler.bind(this);
        this.changePrixHandler = this.changePrixHandler.bind(this);
        this.changeQuantiteHandler = this.changeQuantiteHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ProductService.getProductById(this.state.id).then( (res) =>{
                let product = res.data;
                this.setState({nom: product.nom,
                    prix: product.prix,
                    quantite : product.quantite
                });
            });
        }        
    }
    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {nom: this.state.nom, prix: this.state.prix, quantite: this.state.quantite};
        console.log('product => ' + JSON.stringify(product));
        
        if( this.state.nom === '' || this.state.prix === '' || this.state.quantite === '' ){
            alert("Les champs ne doit pas etre vide");
            return ;
        }

        if (isNaN(this.state.prix)) 
        {
            alert("Le prix doit etre un numéro");
            return false;
        }
       
        if (isNaN(this.state.quantite)) 
        {
            alert("La quantite doit etre un numéro");
            return false;
        }

        // step 5
        if(this.state.id === '_add'){
            ProductService.createProduct(product).then(res =>{
                this.props.history.push('/products');
            });
        }else{
            ProductService.updateProduct(product, this.state.id).then( res => {
                this.props.history.push('/products');
            });
        }
    }
    
    changeNomHandler= (event) => {
        this.setState({nom: event.target.value});
    }

    changePrixHandler= (event) => {
        this.setState({prix: event.target.value});
    }

    changeQuantiteHandler= (event) => {
        this.setState({quantite: event.target.value});
    }

    cancel(){
        this.props.history.push('/products');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Ajouter un produit</h3>
        }else{
            return <h3 className="text-center">Modifier un produit</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nom: </label>
                                            <input placeholder="Nom" name="nom" className="form-control" 
                                                value={this.state.nom} onChange={this.changeNomHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Prix: </label>
                                            <input placeholder="Prix" name="prix" className="form-control" 
                                                value={this.state.prix} onChange={this.changePrixHandler} required/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Quantité: </label>
                                            <input placeholder="Quantité" name="quantite" className="form-control" 
                                                value={this.state.quantite} onChange={this.changeQuantiteHandler} required/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateProductComponent
