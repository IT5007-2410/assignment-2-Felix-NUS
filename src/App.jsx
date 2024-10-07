import React from "react";
/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
    {
        id: 1, name: 'Jack', phone: 88885555, gender: 'male',
        bookingTime: new Date(), seatNumber: 1,
    },
    {
        id: 2, name: 'Rose', phone: 88884444, gender: 'female',
        bookingTime: new Date(), seatNumber: 2,
    },
    {
        id: 3, name: 'Person1', phone: 88883333, gender: 'male',
        bookingTime: new Date(), seatNumber: 3,
    },
    {
        id: 4, name: 'Person2', phone: 88882222, gender: 'female',
        bookingTime: new Date(), seatNumber: 4,
    },
    {
        id: 5, name: 'Person3', phone: 88881111, gender: 'male',
        bookingTime: new Date(), seatNumber: 5,
    },
];


function TravellerRow(props) {
    {/*Q3. Placeholder to initialize local variable based on traveller prop.*/
    }
    const {traveller} = props;
    return (
        <tr>
            {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
            <td>{traveller.id}</td>
            <td>{traveller.name}</td>
            <td>{traveller.phone}</td>
            <td>{traveller.gender}</td>
            <td>{traveller.seatNumber}</td>
            <td>{traveller.bookingTime.toDateString()}</td>
        </tr>
    );
}

function Display(props) {
    /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
    const {travellers} = props;
    return (
        <table className="bordered-table">
            <thead>
            <tr>
                {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Seat Number</th>
                <th>Booking Time</th>
            </tr>
            </thead>
            <tbody>
            {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
            {travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller}/>)}
            </tbody>
        </table>
    );
}

class Add extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
        const form = document.forms.addTraveller;
        const newTraveller = {
            id: form.travellerid.value,
            name: form.travellername.value,
            phone: form.travellerphone.value,
            gender: form.travellergender.value,
            seatNumber: form.travellerseatNumber.value,
            bookingTime: new Date(),
        }
        this.props.bookTraveller(newTraveller);
        form.reset();
    }

    render() {
        return (
            <form name="addTraveller" onSubmit={this.handleSubmit}>
                {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
                <input type="text" name="travellerid" placeholder="ID"/>
                <input type="text" name="travellername" placeholder="Name"/>
                <input type="text" name="travellerphone" placeholder="Phone"/>
                <input type="text" name="travellergender" placeholder='Gender'/>
                <input type="text" name="travellerseatNumber" placeholder="Seat Number"/>
                <button>Add</button>
            </form>
        );
    }
}


class Delete extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    }

    render() {
        return (
            <form name="deleteTraveller" onSubmit={this.handleSubmit}>
                {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
                <input type="text" name="travellername" placeholder="Name"/>
                <button>Delete</button>
            </form>
        );
    }
}

class Homepage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
            </div>);
    }
}

class TicketToRide extends React.Component {
    constructor() {
        super();
        this.state = {travellers: [], selector: 1};
        this.bookTraveller = this.bookTraveller.bind(this);
        this.deleteTraveller = this.deleteTraveller.bind(this);
    }

    setSelector(value) {
        /*Q2. Function to set the value of component selector variable based on user's button click.*/
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({travellers: initialTravellers});
        }, 500);
    }

    bookTraveller(passenger) {
        /*Q4. Write code to add a passenger to the traveller state variable.*/
        this.setState({travellers: [...this.state.travellers, passenger]});
    }

    deleteTraveller(passenger) {
        /*Q5. Write code to delete a passenger from the traveller state variable.*/
    }

    render() {
        return (
            <div>
                <h1>Ticket To Ride</h1>
                <div>
                    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
                </div>
                <div>
                    {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
                    {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
                    {/*Q3. Code to call component that Displays Travellers.*/}

                    {/*Q4. Code to call the component that adds a traveller.*/}
                    {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
                </div>
            </div>
        );
    }
}

const element = <TicketToRide/>;

ReactDOM.render(element, document.getElementById('contents'));
