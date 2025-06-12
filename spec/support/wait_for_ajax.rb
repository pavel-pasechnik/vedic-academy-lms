module WaitForAjax
  def wait_for_ajax(timeout = Capybara.default_max_wait_time)
    Timeout.timeout(timeout) do
      loop until finished_all_ajax_requests?
    end
  end

  def finished_all_ajax_requests?
    page.evaluate_script('jQuery.active').to_i.zero?
  end
end

RSpec.configure do |config|
  config.include WaitForAjax, type: :feature
end
