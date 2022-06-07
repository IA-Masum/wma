@component('mail::message')
# Hi There

Your Varification Code is # {{ $code }}.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
