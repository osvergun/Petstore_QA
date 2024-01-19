import { request } from '../helpers/request';
import { validatePetServiceAvailability, notFoundPetById, successFindPetById } from '../helpers/generic';
import { defineFeature, loadFeature } from 'jest-cucumber';

const faker = require('faker');
const feature = loadFeature('features/addingPet.feature');
const baseEndpoint = '/pet';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const catImage = 'https://pixabay.com/images/id-1192026/';

defineFeature(feature, (test) => {
    const corePayload = {
        category: {
            id: faker.datatype.number({ min: 1, max: 20 }),
            name: "pets",
        },
        tags: [{
            id: faker.datatype.number({ min: 30, max: 40 }),
            name: faker.datatype.datetime(),
            },
        ],
    };

    test('Add a new pet to the petstore', ({ given, when, then }) => {
        const petId = faker.datatype.number({ min: 10, max: 1000 });
        const payload = {
            id: petId,
            name: faker.name.firstName(),
            photoUrls: [catImage],
            status: "preorder",
            ...corePayload,
        };

        given('The petstore service is available', () => {
            validatePetServiceAvailability();
        });

        when('I add a new pet to the pet store', () => {
            return request
                .post(baseEndpoint)
                .send(headers)
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).not.toBe(null);
                    expect(typeof response.body).toBe('object');
                    expect(response.body.id).toEqual(petId);
                    expect(response.body.status).toBe('preorder');
                });
        });

        then('I can find my newly added pet in the petstore', () => {
            successFindPetById(baseEndpoint, petId, headers, payload);
        });
    });
});