FROM public.ecr.aws/lambda/ruby:3.4.2025.09.27.12-x86_64

COPY Gemfile Gemfile.lock ./

ENV PATH=$PATH:${LAMBDA_TASK_ROOT}/bin
ENV HOME=/tmp
ENV GEM_HOME=vendor/bundle
ENV BUNDLE_PATH=${GEM_HOME}
ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=1
ENV TZ=Asia/Tokyo

RUN dnf install -y \
        firefox \
        fontconfig \
        gcc \
        ipa-gothic-fonts \
        libyaml-devel \
        make \
        patch \
        tar \
        xz \
    && bundle install \
    && fc-cache -fv \
    && dnf remove -y \
        patch \
        tar \
        xz \
    && rm -rf /var/cache/dnf/* \
    && dnf clean all

COPY . .

CMD ["lambda.handler"]
