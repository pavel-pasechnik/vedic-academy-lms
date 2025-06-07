module Ui
  class TeacherProfilesController < Ui::BaseController
    def index
      authorize TeacherProfile, :ui_index?

      respond_with_interaction Ui::TeacherProfilesLoadingInteraction
    end
  end
end
