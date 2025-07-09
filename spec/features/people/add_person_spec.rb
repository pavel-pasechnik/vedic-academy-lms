require 'rails_helper'

RSpec.describe 'Add person', type: :feature do
  before do
    login_as_admin
    visit new_person_path
  end

  context 'link in flash' do
    it 'displays link in flash message' do
      person_built = fill_person_data(gender: 'Жіноча')
      click_button 'Створити Person'
      person = Person.find_by(email: person_built.email)

      expect(find('.alert-dismissible')).to have_link(person.complex_name, href: person_path(person))
    end
  end

  context 'simple (no student, no teacher)' do
    context 'adds Person' do
      it 'creates a new person' do
        fill_person_data(gender: 'Жіноча')

        expect {
          click_button 'Створити Person'
        }.to change { Person.count }.by(1)

        expect(page).to have_selector('.alert-success')
      end
    end

    context 'does not add person' do
      it 'does not create person with invalid email' do
        fill_person_data(email: '3322')

        expect {
          click_button 'Створити Person'
        }.not_to change { Person.count }

        expect(page).to have_selector('.alert-danger')
      end
    end
  end

  def fill_person_data(p = {})
    pf = build_stubbed(:person, p)

    fill_in 'phone',              with: pf.telephones.first.phone
    fill_in 'person_name',        with: pf.name
    fill_in 'person_email',       with: pf.email
    fill_in 'person_surname',     with: pf.surname
    fill_in 'person[birthday]',   with: (p[:birthday] || '30.05.1984')
    fill_in 'person_middle_name', with: pf.middle_name

    select (p[:gender] || 'Чоловіча').to_s, from: 'person_gender'

    pf
  end
end
