import { LightningElement } from 'lwc';

export default class BusinessCardParent extends LightningElement {
    userDetails=[
        {
            name: 'John Doe',
            title: 'CEO & Founder',
            company: 'Harverd Uiversity',
            buttontext: 'Contact',
            imageUrl: 'https://media.istockphoto.com/id/1223889897/photo/harvard.jpg?s=612x612&w=0&k=20&c=t2h7gpjeOSZVZGx42QLeHYXBPDimKSQ7W5i7DserNyo='

        },
        {
            name: 'Mark Zukerberg',
            title: 'CEO & Founder',
            company: 'Meta',
            buttontext: 'Contact',
            imageUrl: 'https://cdn.geekwire.com/wp-content/uploads/2021/10/Meta_lockup_primary_RGB.jpg'

        },
        {
            name: 'Steve Jobs',
            title: 'CEO & Founder',
            company: 'Apple',
            buttontext: 'Contact',
            imageUrl: 'https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/getty_1169538423_2000127320009280345_sjnj76.jpg'

        }
    ]
}