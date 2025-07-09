require 'swagger_helper'

RSpec.describe 'API V1 People', type: :request do
  path '/api/v1/people' do

    get 'Get a list of people' do
      tags 'People'
      produces 'application/json'
      security [Bearer: []]

      response '200', 'Успех' do
        let!(:person) { create(:person) }
        let(:Authorization) { "Bearer #{person.create_new_auth_token['access-token']}" }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:Authorization) { '' }
        run_test!
      end
    end

  end
end
