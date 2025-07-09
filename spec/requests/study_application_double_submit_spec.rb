require 'swagger_helper'

RSpec.describe 'Study Applications API', type: :request do
  path '/study_applications' do

    post 'Create a training application (one-time creation)' do
      tags 'Study Applications'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: []]

      parameter name: :study_application, in: :body, schema: {
        type: :object,
        properties: {
          person_id: { type: :integer },
          program_id: { type: :integer }
        },
        required: ['person_id', 'program_id']
      }

      response '200', 'Application successfully created' do
        let!(:person) { create(:person) }
        let!(:program) { create(:program) }
        let(:Authorization) { "Bearer #{person.create_new_auth_token['access-token']}" }
        let(:study_application) do
          {
            person_id: person.id,
            program_id: program.id
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['program_id']).to eq(program.id)
        end
      end

      response '401', 'Unauthorized request' do
        let(:Authorization) { '' }
        let(:study_application) { {} }
        run_test!
      end
    end

  end
end
