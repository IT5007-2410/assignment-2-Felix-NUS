/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
    {
        id: 1, name: 'Jack', phone: 88885555, gender: 'Male',
        bookingTime: new Date()
    },
    {
        id: 2, name: 'Rose', phone: 88884444, gender: 'Female',
        bookingTime: new Date()
    },
    {
        id: 3, name: 'Person1', phone: 88883333, gender: 'Male',
        bookingTime: new Date()
    },
    {
        id: 4, name: 'Person2', phone: 88882222, gender: 'Female',
        bookingTime: new Date()
    },
    {
        id: 5, name: 'Person3', phone: 88881111, gender: 'Male',
        bookingTime: new Date()
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
            <td>{traveller.bookingTime.toDateString()}</td>
        </tr>
    );
}

function Display(props) {
    /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
    const {travellers} = props;
    console.log("travellers: ", travellers);
    return (
        <table className="bordered-table">
            <thead>
            <tr>
                {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
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
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
        const {travellers} = this.props;
        if (travellers.length === 10) {
            alert("The seats are full!");
            return;
        }
        const form = document.forms.addTraveller;
        const newTraveller = {
            id: form.travellerid.value,
            name: form.travellername.value,
            phone: form.travellerphone.value,
            gender: form.travellergender.value,
            bookingTime: new Date(),
        }
        if (!newTraveller.id || !newTraveller.name || !newTraveller.phone) {
            alert("Please fill all the fields!");
            return;
        }
        let flag = false;
        travellers.forEach(element => {
            if (element.name === newTraveller.name) {
                alert("The passenger is already in the list!");
                flag = true;
            }
        })
        if (!flag) {
            alert("The passenger has been added successfully!");
            this.props.bookTraveller(newTraveller);
            form.reset();
        }
    }

    render() {
        return (
            <form name="addTraveller" onSubmit={this.handleSubmit}>
                {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
                <input type="number" name="travellerid" placeholder="ID"/>
                <input type="text" name="travellername" placeholder="Name"/>
                <input type="number" name="travellerphone" placeholder="Phone"/>
                <select name="travellergender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
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
        const form = document.forms.deleteTraveller;
        this.props.deleteTraveller({name: form.travellername.value});
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
    constructor(props) {
        super(props);
        this.totalSeats = 10;
    }

    render() {
        const { travellers } = this.props;

        // console.log(travellers);

        // available seats
        let freeSeats = this.totalSeats;
        if (travellers !== undefined) {
            freeSeats = this.totalSeats - travellers.length;
        }

        const seats = [];
        // Because there are no seats number, so just change the first few occupied seats color.
        for (let i = 0; i < this.totalSeats; i++) {
            if (travellers !== undefined && i < travellers.length) {
                seats.push('occupied');
            } else {
                seats.push('free');
            }
        }

        return (
            <div>
                {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
                <h2>Now, there are * {freeSeats} * available seats!</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 50px)',
                    gap: '10px'
                }}>
                    {
                        seats.map((seat, index) => (
                            <button
                                key={index}
                                style={{
                                    backgroundColor: seat === 'occupied' ? 'grey' : 'green',
                                    color: 'white',
                                    margin: '5px',
                                    height: '50px',
                                    width: '50px',
                                    cursor: 'default',
                                }}
                                disabled
                            >
                            </button>
                        ))
                    }
                </div>
            </div>
        );
    }
}

class TicketToRide extends React.Component {
    constructor() {
        super();
        this.state = {travellers: [], selector: 1};
        this.bookTraveller = this.bookTraveller.bind(this);
        this.deleteTraveller = this.deleteTraveller.bind(this);
        this.setSelector = this.setSelector.bind(this);
    }

    setSelector(value) {
        /*Q2. Function to set the value of component selector variable based on user's button click.*/
        this.setState({selector: value});
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
        console.log("bookTraveller: ", passenger);
        const newList = this.state.travellers.slice();
        newList.push(passenger);
        this.setState({travellers: newList});
        console.log("newTravellers: ", this.state.travellers);
    }

    deleteTraveller(passenger) {
        /*Q5. Write code to delete a passenger from the traveller state variable.*/
        console.log("deleteTraveller: ", passenger);
        if (this.state.travellers.length === 0) {
            alert("No passenger in the list!");
            return;
        }
        if (!passenger.name) {
            alert("Please fill the name field!");
            return;
        }
        var newList = [];
        var found = false;
        this.state.travellers.forEach(element => {
            if (element.name !== passenger.name) {
                newList.push(element);
            }else {
                found = true;
            }
        })
        if (!found) {
            alert("The passenger is not found!");
            return;
        }
        this.setState({travellers: newList});
        alert("The passenger has been deleted successfully!");
        console.log("newTravellers: ", this.state.travellers);
    }

    render() {
        return (
            <div>
                <h1>Ticket To Ride</h1>
                <div>
                    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
                    <button onClick={() => this.setSelector(1)}>Homepage</button>
                    <button onClick={() => this.setSelector(2)}>Display Travellers</button>
                    <button onClick={() => this.setSelector(3)}>Add Traveller</button>
                    <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
                </div>
                <div>
                    {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
                    {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
                    {this.state.selector === 1 && <Homepage travellers={this.state.travellers}/>}
                    {/*Q3. Code to call component that Displays Travellers.*/}
                    {this.state.selector === 2 && <Display travellers={this.state.travellers}/>}
                    {/*Q4. Code to call the component that adds a traveller.*/}
                    {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers}/>}
                    {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
                    {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller}/>}
                </div>
            </div>
        );
    }
}

const element = <TicketToRide/>;

ReactDOM.render(element, document.getElementById('contents'));
