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
        fontconfig \
        gcc \
        ipa-gothic-fonts \
        libyaml-devel \
        make \
        patch \
        tar \
        wget \
        xz \
    && wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    && dnf install -y `rpm -qR google-chrome-stable_current_x86_64.rpm | grep -v rpmlib | tr '\n' ' ' ` \
    && rpm -i ./google-chrome-stable_current_x86_64.rpm \
    && bundle install \
    && fc-cache -fv \
    && dnf remove -y \
        patch \
        tar \
        xz \
    && rm -rf /var/cache/dnf/* \
    && dnf clean all \
    && rm -f ./google-chrome-stable_current_x86_64.rpm

COPY . .

CMD ["lambda.handler"]
