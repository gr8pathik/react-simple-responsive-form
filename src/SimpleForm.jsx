import React from 'react';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            isSubmitted: false,
            formData: this.emptyForm()
        };
    }

    emptyForm = () => {
        return {
            name: '',
            email: '',
            message: ''
        }
    };

    handleChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, message} = this.state.formData;
        this.setState({loader: true});

        if (name.length < 1 || email.length < 1 || message.length < 1) {
            return false
        }

        setTimeout(() => {
            console.log("Name: ", name);
            console.log("Email: ", email);
            console.log("Message: ", message);
            this.setState({loader: false, formData: this.emptyForm(), isSubmitted: true})
        }, 5000)
    };

    resetSubmit = () => {
        this.setState({isSubmitted: false})
    };

    render() {
        const {formData, loader, isSubmitted} = this.state;
        return (
            <div className="container">
                {loader && <div className="loader">
                    <div className="lds-dual-ring"></div>
                </div>}
                <div className="wrapper">
                    <h2>Contact Form</h2>
                    <p>Resize the browser window to see the effect. When the screen is less than 600px wide, make the
                        two
                        columns stack on top of each other instead of next to each other.</p>
                    <form onSubmit={this.handleSubmit}>
                        {!isSubmitted && <div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" id="name" autoComplete="name" name="name" placeholder="Your name.." required
                                           onChange={this.handleChange} value={formData.name}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="col-75">
                                    <input type="email" id="email" autoComplete="email" name="email" placeholder="Your email.." required
                                           onChange={this.handleChange} value={formData.email}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="message">Message</label>
                                </div>
                                <div className="col-75">
                                <textarea id="message" name="message" required placeholder="Write something.."
                                          style={{"height": "200px"}}
                                          onChange={this.handleChange} value={formData.message}></textarea>
                                </div>
                            </div>
                        </div>}
                        {isSubmitted && <div className="row">
                            Your data is submitted. Thanks, for using our form.
                        </div>}
                        <div className="row">
                            {isSubmitted ? <input type="button" value="Ok" onClick={this.resetSubmit}/> :
                                <input type="submit" value="Submit"/>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}